// subtaskSchema.js
const { gql } = require('apollo-server-express');

module.exports = gql`
  type Subtask {
    id: ID!
    title: String!
    taskId: Task!
    assignedTo: [User]
    isCompleted: Boolean
    notes: String
    dueDate: String
    order: Int
    createdAt: String
    updatedAt: String
  }

  input SubtaskInput {
    title: String!
    taskId: ID!
    assignedTo: [ID]
    isCompleted: Boolean
    notes: String
    dueDate: String
    order: Int
  }

  extend type Query {
    getSubtasksByTask(taskId: ID!): [Subtask]
    getSubtask(id: ID!): Subtask
  }

  extend type Mutation {
    addSubtask(input: SubtaskInput): Subtask
    updateSubtask(id: ID!, input: SubtaskInput): Subtask
    deleteSubtask(id: ID!): Boolean
  }
`;
