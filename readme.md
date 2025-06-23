# 🚀 Task & Project Management App (v2)

A robust and scalable task, project, and team collaboration system inspired by tools like ClickUp and Jira. Built with **Node.js**, **Express**, **GraphQL**, **MongoDB**, and **WebSocket-based subscriptions** for real-time updates.

---

## 📦 Features

- 🔐 **User Authentication** with Role-based Access (`admin`, `employee`)
- 🧑‍🤝‍🧑 **Team Collaboration** on Projects, Boards, and Tasks
- ✅ **Project Boards** with dynamic columns and task flow
- 📋 **Task Management** with Subtasks, Assignees, and Statuses
- 💬 **Comment System** with authorship and timestamps
- 🔔 **Notifications** (with read tracking)
- 🕒 **Activity Logs** for user actions
- 🌐 **GraphQL API** with Queries, Mutations, and Subscriptions
- 🧪 **Automated Tests** with Jest & Supertest
- 📡 **GraphQL Subscriptions** via `graphql-ws`
- 📂 Clean **MVC + Service Layer Architecture**

---

## 🛠️ Technologies Used

- **Node.js + Express**
- **MongoDB + Mongoose**
- **GraphQL** with `graphql` & `express-graphql`
- **WebSocket Subscriptions** using `graphql-ws` + `ws`
- **JWT Auth** for secure access
- **Jest** for test automation
- **dotenv** for environment management

---

## 📁 Project Structure

src/
├── config/ # DB connection and environment config
├── middleware/ # Auth & Role-based middleware
├── models/ # Mongoose schemas
├── resolvers/ # GraphQL resolvers using services
├── schemas/ # GraphQL schema definitions
├── services/ # Business logic abstraction layer
├── pubsub/ # GraphQL subscription PubSub setup
├── routes/ # Optional REST API routes
├── wsServer.js # GraphQL WebSocket setup
├── server.js # App entry point
tests/ # Jest-based integration tests

project-manager-v2/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Board.js
│   │   ├── Task.js
│   │   ├── Subtask.js
│   │   ├── Comment.js
│   │   ├── Notification.js
│   │   └── Activity.js
│   │
│   ├── schemas/
│   │   ├── index.js
│   │   ├── userSchema.js
│   │   ├── projectSchema.js
│   │   ├── taskSchema.js
│   │   ├── commentSchema.js
│   │   └── authSchema.js
│   │
│   ├── resolvers/
│   │   ├── index.js
│   │   ├── userResolvers.js
│   │   ├── projectResolvers.js
│   │   ├── taskResolvers.js
│   │   ├── commentResolvers.js
│   │   └── authResolvers.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── roles.js
│   │
│   ├── services/
│   │   ├── userService.js
│   │   ├── projectService.js
│   │   ├── taskService.js
│   │   └── commentService.js
│   │
│   ├── utils/
│   │   ├── logger.js
│   │   ├── formatters.js
│   │   └── validators.js
│   │
│   ├── pubsub/
│   │   └── index.js
│   │
│   ├── constants/
│   │   └── enums.js
│   │
│   └── app.js
│
├── tests/
│   ├── auth.test.js
│   ├── user.test.js
│   ├── project.test.js
│   ├── task.test.js
│   └── comment.test.js
│
├── scripts/
│   └── seed.js
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md


---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/your-username/task-app.git
cd task-app
npm install

.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-app
JWT_SECRET=your_jwt_secret

### run the server 

npm start

### run test 

npm test

🧪 Sample GraphQL Query

mutation {
  registerUser(input: {
    name: "Admin User",
    email: "admin@example.com",
    password: "123456",
    role: "admin"
  }) {
    id
    name
  }
}

📬 Subscriptions

subscription {
  taskCreated(projectId: "YOUR_PROJECT_ID") {
    id
    title
  }
}

Client must support the graphql-ws protocol and connect to ws://localhost:5000/graphql.

📃 License
MIT © 2025 — Built by [MD. Jahidul Alam]


---

Let me know if you'd like to:
- Add Docker support
- Publish this to GitHub
- Include Swagger or REST endpoint docs alongside GraphQL

Ready to proceed with REST controller setup using services?
