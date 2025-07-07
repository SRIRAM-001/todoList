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

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Use 'venv\\Scripts\\activate' on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

**### Frontend Setup**

```bash
Copy
Edit
cd frontend
npm install
npm run dev
The app will run at: http://localhost:3000


**AI Configuration**
import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")

UI SAMPLES

