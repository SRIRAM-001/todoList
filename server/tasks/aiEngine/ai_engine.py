import google.generativeai as genai
import json
import os
api_key = os.getenv("GOOGLE_API_KEY")

genai.configure(api_key="AIzaSyD4CZjhjsuUmMR4NXIACGpPPUfFz2abK-Q")


import re

def clean_json_response(raw_text):
    # Remove Markdown-style code block (e.g. ```json ... ```)
    cleaned = re.sub(r"^```json\s*|```$", "", raw_text.strip(), flags=re.MULTILINE)
    return cleaned.strip()




# models = genai.list_models()
# for m in models:
#     print(m.name)




model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")





def process_task_with_context(task_data, context_list=None):
    prompt = f"""Analyze the following task with context and enhance it:

Task:
Title: {task_data['title']}
Description: {task_data['description']}
Category: {task_data.get('category', 'General')}

Context:
{chr(10).join(context_list or [])}

Return ONLY a valid JSON object with keys:
- improved_description
- priority (High/Medium/Low)
- category
- suggested_deadline
Do NOT include any commentary or explanation.
"""

    content = ""  # Initialize to avoid undefined variable in exception
    try:
        response = model.generate_content(prompt)
        content = response.text.strip()
        print("🔍 AI Raw Output:\n", content)
        cleaned = clean_json_response(content)
        return json.loads(cleaned)
    except json.JSONDecodeError as e:
        print("JSON parsing failed:", str(e))
        print(" Raw response (likely not JSON):\n", content)
        return {}
    except Exception as e:
        print(" AI error:", str(e))
        return {}


def process_context_insight(raw_context):
    """
    Analyze a single context entry (e.g., WhatsApp message) and return a summarized insight.
    Input: raw_context = "Email from manager: Submit report by Friday"
    Output: "Submit report by Friday"
    """
    prompt = f"""
    You are an AI assistant helping a user manage tasks from their daily messages.

    Analyze the following message and return one actionable insight or summary of its purpose:
    Context: "{raw_context}"

    Respond with just the insight, no extra explanation.
    """

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(" AI error while processing context:", e)
        return ""