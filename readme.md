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
