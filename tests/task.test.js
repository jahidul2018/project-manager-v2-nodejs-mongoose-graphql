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

let token, userId, projectId, boardId, taskId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Register and login user
    const regRes = await request(app).post('/graphql').send({
        query: `
      mutation {
        registerUser(input: {
          name: "Task Admin",
          email: "taskadmin@example.com",
          password: "123456",
          role: "admin"
        }) { id }
      }
    `
    });
    userId = regRes.body.data.registerUser.id;

    const loginRes = await request(app).post('/graphql').send({
        query: `
      mutation {
        login(input: {
          email: "taskadmin@example.com",
          password: "123456"
        }) {
          token
        }
      }
    `
    });
    token = loginRes.body.data.login.token;

    // Create Project
    const projectRes = await request(app).post('/graphql').set('Authorization', `Bearer ${token}`).send({
        query: `
      mutation {
        addProject(input: {
          name: "Task Project",
          description: "Project for tasks",
          owner: "${userId}",
          members: ["${userId}"]
        }) {
          id
        }
      }
    `
    });
    projectId = projectRes.body.data.addProject.id;

    // Create Board
    const boardRes = await request(app).post('/graphql').set('Authorization', `Bearer ${token}`).send({
        query: `
      mutation {
        addBoard(input: {
          name: "Main Board",
          projectId: "${projectId}",
          columns: [{ name: "Todo", order: 1 }]
        }) {
          id
        }
      }
    `
    });
    boardId = boardRes.body.data.addBoard.id;
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('Task Resolver Tests', () => {

    it('should create a new task', async () => {
        const query = {
            query: `
        mutation {
          addTask(input: {
            title: "Initial Task",
            description: "Build login",
            status: "todo",
            priority: "high",
            assignedTo: "${userId}",
            projectId: "${projectId}",
            boardId: "${boardId}",
            tags: ["auth", "core"]
          }) {
            id
            title
          }
        }
      `
        };

        const res = await request(app)
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send(query);

        expect(res.status).toBe(200);
        expect(res.body.data.addTask.title).toBe("Initial Task");
        taskId = res.body.data.addTask.id;
    });

    it('should fetch tasks by project', async () => {
        const query = {
            query: `
        query {
          getTasksByProject(projectId: "${projectId}") {
            id
            title
            status
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.getTasksByProject.length).toBeGreaterThan(0);
    });

    it('should fetch a task by ID', async () => {
        const query = {
            query: `
        query {
          getTask(id: "${taskId}") {
            id
            title
            priority
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.getTask.priority).toBe("high");
    });

});
