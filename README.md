
# 🧩 Task Dependency Manager (Task Tracker)

A **full-stack web application** that allows users to create tasks, define dependencies between tasks, and visualize task relationships using a graph.
The system prevents **circular dependencies** and helps manage task execution order.

---

## 🚀 Features

* ✅ Create tasks
* 🔗 Add dependencies between tasks
* 🔁 Detect and prevent circular dependencies
* 📊 Visualize task dependencies as a graph
* 🌐 REST API using Django REST Framework
* ⚛️ Frontend built with React + Vite

---

## 🛠️ Tech Stack

### Backend

* Python
* Django
* Django REST Framework
* SQLite (default DB)

### Frontend

* React (Vite)
* JavaScript
* HTML & CSS

---

## 📁 Project Structure

```
task-tracker/
│
├── backend/
│   ├── config/
│   ├── tasks/
│   ├── manage.py
│   └── db.sqlite3
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Graph.jsx
│   │   └── api.js
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Backend Setup (Django)

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver
```

Backend runs at:

```
http://127.0.0.1:8000/
```

API Endpoints:

```
GET /api/tasks/
POST /api/tasks/
GET /api/dependencies/
POST /api/dependencies/
```

---

## ⚛️ Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173/
```

---

## 📊 Graph Visualization

* Tasks are shown as nodes
* Dependencies are shown as directed edges
* Automatically updates when tasks or dependencies change

---

## 🧪 Example

* Task A
* Task B depends on Task A
* Circular dependency is blocked by the system

---

## 🧑‍💻 Author

**Abhigna Karanam**

---

## 📌 Notes

* This project is for learning and academic purposes
* SQLite is used for simplicity
* Can be extended with authentication and deployment

---

## ⭐ If you like this project

Give it a ⭐ on GitHub
