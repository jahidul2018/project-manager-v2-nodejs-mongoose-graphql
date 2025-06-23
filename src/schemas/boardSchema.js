// boardSchema.js
const { gql } = require('apollo-server-express');

// module.exports = gql`
//   type BoardColumn {
//     name: String!
//     order: Int!
//   }

//   type Board {
//     id: ID!
//     name: String!
//     projectId: Project!
//     columns: [BoardColumn]!
//     isDefault: Boolean
//     createdAt: String
//     updatedAt: String
//   }

//   input BoardColumnInput {
//     name: String!
//     order: Int!
//   }

//   input BoardInput {
//     name: String!
//     projectId: ID!
//     columns: [BoardColumnInput]!
//     isDefault: Boolean
//   }

//   extend type Query {
//     getBoardsByProject(projectId: ID!): [Board]
//     getBoard(id: ID!): Board
//   }

//   extend type Mutation {
//     addBoard(input: BoardInput): Board
//     updateBoard(id: ID!, input: BoardInput): Board
//     deleteBoard(id: ID!): Boolean
//   }
// `;

module.exports = gql`
type Board {
  id: ID!
  name: String!
  projectId: Project
  columns: [BoardColumnInput]
  createdAt: String
}

input BoardInput {
  name: String!
  projectId: ID!
  columns: [BoardColumnInput]
}

input BoardColumnInput {
  name: String!
  order: Int!
}

type Query {
  getBoard(id: ID!): Board
  getBoardsByProject(projectId: ID!): [Board]
}

type Mutation {
  addBoard(input: BoardInput): Board
  updateBoard(id: ID!, input: BoardInput): Board
  deleteBoard(id: ID!): String
}

`;
