# BEAM

## DESCRIPTION

Beam is a solo project and represents my capstone project for the Software Engineering Bootcamp presented by General Assembly, with support from the Saudi Digital Academy.

Beam is a full-stack productivity app that allows users to:
- Track tasks and display them in an integrated calendar
- Link tasks to goals
- Track mood and receive AI-generated insights/supportive messages
- Use a whiteboard for mind mapping or vision boards, including image support

The core idea of this app is to enhance productivity in a healthy way, supporting users to manage tasks effectively while taking care of their mental well-being.

## CORE FEATURES:
### Dashboard
Displays important information to the user such as:
- Frequency of selected moods (emojis) throughout the month (pie chart)
- Highest priority task of the day
- Progress of today’s assigned tasks
- All goals and the number of tasks completed toward them (bar chart)
- Calendar displaying each day’s selected mood/emoji
- Supportive message if a goal is achieved
- AI analysis of trends based on tasks, progress, journal, and mood entries to personalize AI responses

### Visionboard
- A whiteboard that allows users to paste images and design inspiration boards
- Users can create multiple pages

### Goals
- Users can set goals and alter their status (active/completed)
- Goals can be filtered based on status

### Tasks
- Users can navigate to any day in the calendar to add/view tasks
- Tasks can be linked to long-term goals
- Tasks are arranged by priority and can be filtered by status

### Mood & Journal Check-In
- Users can check in once a day by selecting an emoji representing their mood
- Users can write a journal describing their feelings
- Responses are processed by a mental health assistant LLM to provide personalized supportive messages


## TECH STACK

### Frontend:
- Framework & Libraries: React, React Router
- Styling: Tailwind CSS, Vanilla CSS
- Tools & Features: Schedule-X, Tldraw, Shadcn, JWT-Decode
### Backend:
- Framework & Language: Django REST Framework, Python
- Middleware: CORS Headers
- AI / LLM: Ollama (local) with the ALIENTELLIGENCE/mentalwellness model
- Database: PostgreSQL
### Dev tools:
- Git & GitHub
- Docker
- Postman

## BACKEND-END REPOSITORY
[BACKEND End](https://github.com/shouqv/wellbeing-productivity-backend)

## INSTALLATION INSTRUCTION (Docker)
1. Clone both repositories into the same parent folder:

```
parent-folder/
├── wellbeing-productivity-backend/
└── wellbeing-productivity-frontend/
```

- Backend:
```
git clone https://github.com/shouqv/wellbeing-productivity-backend.git
```

- Frontend:
```
git clone https://github.com/shouqv/wellbeing-productivity-frontend.git

```

2. Run Docker Compose from the backend folder:
```
cd wellbeing-productivity-backend
docker-compose up --build
```

Note:
- The AI model (Ollama, ALIENTELLIGENCE/mentalwellness) should be installed and running locally for LLM-based features

## ICEBOX FEATURES

- Allow users to view their journal entries in addition to mood entries.
- Implement reminders so users can be notified of upcoming or pending tasks.
- Provide a dedicated account page where users can view and edit additional profile information.
- Make AI-generated supportive messages personalized like the trend analysis response. Currently, only the trend analysis is tailored to the user.
