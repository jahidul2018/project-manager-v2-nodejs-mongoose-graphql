// userSchema.js
const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    address: String
    dateOfBirth: String
    profilePicture: String
    role: String
    isActive: Boolean
    isEmailVerified: Boolean
    createdAt: String
    updatedAt: String
    lastLogin: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    phone: String
    address: String
    dateOfBirth: String
    profilePicture: String
    role: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  extend type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  extend type Mutation {
    registerUser(input: UserInput): User
    login(input: LoginInput): AuthPayload
    deleteUser(id: ID!): Boolean
  }
`;
