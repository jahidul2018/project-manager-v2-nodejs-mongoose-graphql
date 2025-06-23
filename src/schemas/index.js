const { gql } = require('apollo-server-express');

module.exports = gql`
type Subscription {
    taskCreated(projectId: ID!): Task
    commentAdded(taskId: ID!): Comment
}
`;
