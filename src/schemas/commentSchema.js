// commentSchema.js
const { gql } = require('apollo-server-express');

module.exports = gql`
  type Comment {
    id: ID!
    content: String!
    author: User!
    taskId: Task!
    mentions: [User]
    attachments: [String]
    isEdited: Boolean
    createdAt: String
    updatedAt: String
  }

  input CommentInput {
    content: String!
    taskId: ID!
    mentions: [ID]
    attachments: [String]
  }

  extend type Query {
    getCommentsByTask(taskId: ID!): [Comment]
    getComment(id: ID!): Comment
  }

  extend type Mutation {
    addComment(input: CommentInput): Comment
    updateComment(id: ID!, input: CommentInput): Comment
    deleteComment(id: ID!): Boolean
  }
`;
