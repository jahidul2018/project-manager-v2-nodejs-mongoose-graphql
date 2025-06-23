// notificationSchema.js
const { gql } = require('apollo-server-express');

module.exports = gql`
  type Notification {
    id: ID!
    recipient: User!
    message: String!
    type: String
    link: String
    isRead: Boolean
    createdAt: String
    updatedAt: String
  }

  input NotificationInput {
    recipient: ID!
    message: String!
    type: String
    link: String
  }

  extend type Query {
    getNotificationsByUser(userId: ID!): [Notification]
    getNotification(id: ID!): Notification
  }

  extend type Mutation {
    addNotification(input: NotificationInput): Notification
    markNotificationAsRead(id: ID!): Notification
    deleteNotification(id: ID!): Boolean
  }
`;
