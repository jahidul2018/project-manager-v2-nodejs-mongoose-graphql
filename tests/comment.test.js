const request = require('supertest');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('../src/schemas');
const resolvers = require('../src/resolvers');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: false,
}));

let token, userId, taskId, commentId, projectId, boardId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Register & login user
    const register = await request(app).post('/graphql').send({
        query: `
      mutation {
        registerUser(input: {
          name: "CommentUser",
          email: "comment@example.com",
          password: "123456"
        }) {
          id
        }
      }
    `
    });
    userId = register.body.data.registerUser.id;

    const login = await request(app).post('/graphql').send({
        query: `
      mutation {
        login(input: {
          email: "comment@example.com",
          password: "123456"
        }) {
          token
        }
      }
    `
    });
    token = login.body.data.login.token;

    // Create Project
    const projectRes = await request(app).post('/graphql').set('Authorization', `Bearer ${token}`).send({
        query: `
      mutation {
        addProject(input: {
          name: "Comment Project",
          owner: "${userId}",
          members: ["${userId}"]
        }) { id }
      }
    `
    });
    projectId = projectRes.body.data.addProject.id;

    // Create Board
    const boardRes = await request(app).post('/graphql').set('Authorization', `Bearer ${token}`).send({
        query: `
      mutation {
        addBoard(input: {
          name: "Comment Board",
          projectId: "${projectId}",
          columns: [{ name: "To Do", order: 1 }]
        }) { id }
      }
    `
    });
    boardId = boardRes.body.data.addBoard.id;

    // Create Task
    const taskRes = await request(app).post('/graphql').set('Authorization', `Bearer ${token}`).send({
        query: `
      mutation {
        addTask(input: {
          title: "Task for Comments",
          projectId: "${projectId}",
          boardId: "${boardId}",
          assignedTo: "${userId}"
        }) {
          id
        }
      }
    `
    });
    taskId = taskRes.body.data.addTask.id;
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('Comment Resolver Tests', () => {

    it('should add a comment to a task', async () => {
        const query = {
            query: `
        mutation {
          addComment(input: {
            content: "This needs to be fixed!",
            taskId: "${taskId}",
            mentions: ["${userId}"]
          }) {
            id
            content
          }
        }
      `
        };

        const res = await request(app).post('/graphql').set('Authorization', `Bearer ${token}`).send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.addComment.content).toContain("fixed");
        commentId = res.body.data.addComment.id;
    });

    it('should fetch comments by task', async () => {
        const query = {
            query: `
        query {
          getCommentsByTask(taskId: "${taskId}") {
            id
            content
            author {
              id
              name
            }
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.getCommentsByTask.length).toBeGreaterThan(0);
    });

    it('should fetch a single comment by ID', async () => {
        const query = {
            query: `
        query {
          getComment(id: "${commentId}") {
            id
            content
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.getComment.id).toBe(commentId);
    });

});
