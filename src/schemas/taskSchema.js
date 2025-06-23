// taskSchema.js
const { gql } = require('apollo-server-express');

module.exports = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    status: String
    priority: String
    dueDate: String
    assignedTo: User
    projectId: Project!
    boardId: Board
    order: Int
    tags: [String]
    isArchived: Boolean
    createdAt: String
    updatedAt: String
  }

  input TaskInput {
    title: String!
    description: String
    status: String
    priority: String
    dueDate: String
    assignedTo: ID
    projectId: ID!
    boardId: ID
    order: Int
    tags: [String]
    isArchived: Boolean
  }

  extend type Query {
    getTasksByProject(projectId: ID!): [Task]
    getTasksByBoard(boardId: ID!): [Task]
    getTask(id: ID!): Task
  }

  extend type Mutation {
    addTask(input: TaskInput): Task
    updateTask(id: ID!, input: TaskInput): Task
    deleteTask(id: ID!): Boolean
  }
`;
