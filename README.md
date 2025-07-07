# todoList

# AI Task Manager

An intelligent task management system that uses Gemini AI to enhance task creation, extract tasks from context (like notes or emails), and manage priorities, deadlines, and categories effectively.

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Django REST Framework
- **AI:** Gemini Pro (Google Generative AI)
- **Database:** SQLite (for development)

## Features

- AI-generated task descriptions and suggestions
- Converts saved context into actionable tasks
- Deadline and category extraction using natural language
- Filtering tasks by category, priority, and status

## Getting Started

## AI Configuration

Edit ai_engine.py:
genai.configure(api_key="YOUR_API_KEY")

## UI SAMPLES

sCREEN SHOTS HERE: https://docs.google.com/document/d/1nMjJ_jLlEBXH-kogNO7J8cbselUswHvaCTBLLwyw8LI/edit?usp=sharing


### Backend Setup!


```bash
cd backend
python -m venv venv
source venv/bin/activate  # Use 'venv\\Scripts\\activate' on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver```




