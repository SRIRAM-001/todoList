from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from rest_framework import filters
from .models import Task, Category, ContextEntry
from .serializers import TaskSerializer, CategorySerializer, ContextEntrySerializer
from .aiEngine.ai_engine import model
import dateparser
import json
import re

def process_context_insight(text):
    try:
        print("AI triggered on context:", text)
        prompt = f"Summarize the following in one sentence: {text}"
        response = model.generate_content(prompt)
        summary = response.text.strip()
        print("AI Insight:", summary)
        return summary
    except Exception as e:
        print("AI error (insight):", str(e))
        return None


def process_context_to_tasks(text):
    try:
        task_prompt = f"""
From the following text, extract any actionable tasks in this JSON format (no explanation, no markdown, just raw JSON):

{{
  "tasks": [
    {{
      "title": "...",
      "description": "...",
      "priority": "High" | "Medium" | "Low"
    }}
  ]
}}

Text: {text}
"""
        response = model.generate_content(task_prompt)
        content = response.text.strip()
        print("AI Raw Response:\n", content)

        content = re.sub(r"^```json\s*|```$", "", content.strip(), flags=re.MULTILINE).strip()

        return json.loads(content)

    except Exception as e:
        print("AI Task Creation Failed:", str(e))
        print("Raw content received:\n", content)
        return {}


class ContextEntryViewSet(viewsets.ModelViewSet):
    queryset = ContextEntry.objects.all().order_by('-timestamp')
    serializer_class = ContextEntrySerializer

    def perform_create(self, serializer):
        content = serializer.validated_data.get('content', '')

        insight = process_context_insight(content)

        task_data = process_context_to_tasks(content)
        if task_data and 'tasks' in task_data:
            for task in task_data['tasks']:
                title = task.get('title')
                description = task.get('description')
                priority = task.get('priority', 'Medium')
                category_name = task.get('category') or 'General'
                deadline = None

                parsed_deadline = dateparser.parse(description)
                if parsed_deadline:
                    deadline = parsed_deadline.date().isoformat()

                category_obj, _ = Category.objects.get_or_create(name=category_name)

                new_task = {
                    'title': title,
                    'description': description,
                    'priority': priority,
                    'deadline': deadline,
                    'status': 'Pending',
                    'category': category_obj.id
                }

                serializer_task = TaskSerializer(data=new_task)
                if serializer_task.is_valid():
                    serializer_task.save()
                else:
                    print("Task validation failed:", serializer_task.errors)

        serializer.save(processed_insight=insight)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-created_at')
    serializer_class = TaskSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'priority', 'status', 'category__name']
    ordering_fields = ['created_at', 'deadline']

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        status = self.request.query_params.get('status')
        priority = self.request.query_params.get('priority')

        if category:
            queryset = queryset.filter(category__name__iexact=category)
        if status:
            queryset = queryset.filter(status__iexact=status)
        if priority:
            queryset = queryset.filter(priority__iexact=priority)

        return queryset



class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


@api_view(['POST'])
def ai_suggest(request):
    from .aiEngine.ai_engine import process_task_with_context

    data = request.data
    title = data.get('title', '')
    description = data.get('description', '')
    context = data.get('context', [])

    task_data = {'title': title, 'description': description}
    enhanced = process_task_with_context(task_data, context)

    raw_deadline = enhanced.get('suggested_deadline')
    parsed_deadline = dateparser.parse(raw_deadline)
    formatted_deadline = parsed_deadline.date().isoformat() if parsed_deadline else None

    category_name = enhanced.get('category') or data.get('category', 'General')
    category_obj = None
    if category_name:
        category_obj, _ = Category.objects.get_or_create(name=category_name)

    task = {
        'title': title,
        'description': enhanced.get('improved_description', description),
        'priority': enhanced.get('priority', 'Medium'),
        'deadline': formatted_deadline,
        'status': 'Pending',
        'category': category_obj.id if category_obj else None
    }

    print("Final Task Payload:", task)

    serializer = TaskSerializer(data=task)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=400)
