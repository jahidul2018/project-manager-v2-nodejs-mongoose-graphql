// projectSchema.js
const { gql } = require('apollo-server-express');

module.exports = gql`
  type Project {
    id: ID!
    name: String!
    description: String
    owner: User!
    members: [User]
    startDate: String
    endDate: String
    isArchived: Boolean
    visibility: String
    createdAt: String
    updatedAt: String
  }

  input ProjectInput {
    name: String!
    description: String
    owner: ID!
    members: [ID]
    startDate: String
    endDate: String
    visibility: String
  }

  extend type Query {
    getProjects: [Project]
    getProject(id: ID!): Project
  }

  extend type Mutation {
    addProject(input: ProjectInput): Project
    updateProject(id: ID!, input: ProjectInput): Project
    deleteProject(id: ID!): Boolean
  }
`;
