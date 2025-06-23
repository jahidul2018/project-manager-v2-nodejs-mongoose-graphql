// activitySchema.js
const { gql } = require('apollo-server-express');

module.exports = gql`
  type Activity {
    id: ID!
    user: User!
    action: String!
    entityType: String!
    entityId: ID!
    projectId: Project
    metadata: JSON
    timestamp: String
    createdAt: String
    updatedAt: String
  }

  input ActivityInput {
    user: ID!
    action: String!
    entityType: String!
    entityId: ID!
    projectId: ID
    metadata: JSON
  }

  scalar JSON

  extend type Query {
    getActivitiesByProject(projectId: ID!): [Activity]
    getActivity(id: ID!): Activity
  }

  extend type Mutation {
    addActivity(input: ActivityInput): Activity
    deleteActivity(id: ID!): Boolean
  }
`;
