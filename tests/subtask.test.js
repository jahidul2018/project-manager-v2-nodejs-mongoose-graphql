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

let token, userId, taskId, subtaskId, projectId, boardId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Register and login user
    const regRes = await request(app).post('/graphql').send({
        query: `
      mutation {
        registerUser(input: {
          name: "Subtask User",
          email: "subtaskuser@example.com",
          password: "123456"
        }) {
          id
        }
      }
    `
    });
    userId = regRes.body.data.registerUser.id;

    const loginRes = await request(app).post('/graphql').send({
        query: `
      mutation {
        login(input: {
          email: "subtaskuser@example.com",
          password: "123456"
        }) {
          token
        }
      }
    `
    });
    token = loginRes.body.data.login.token;

    // Create project
    const projectRes = await request(app).post('/graphql').set('Authorization', `Bearer ${token}`).send({
        query: `
      mutation {
        addProject(input: {
          name: "Subtask Project",
          owner: "${userId}",
          members: ["${userId}"]
        }) { id }
      }
    `
    });
    projectId = projectRes.body.data.addProject.id;

    // Create board
    const boardRes = await request(app).post('/graphql').set('Authorization', `Bearer ${token}`).send({
        query: `
      mutation {
        addBoard(input: {
          name: "Subtask Board",
          projectId: "${projectId}",
          columns: [{ name: "To Do", order: 1 }]
        }) { id }
      }
    `
    });
    boardId = boardRes.body.data.addBoard.id;

    // Create task
    const taskRes = await request(app).post('/graphql').set('Authorization', `Bearer ${token}`).send({
        query: `
      mutation {
        addTask(input: {
          title: "Parent Task",
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

describe('Subtask Resolver Tests', () => {

    it('should create a subtask', async () => {
        const query = {
            query: `
        mutation {
          addSubtask(input: {
            title: "Build Login UI",
            taskId: "${taskId}",
            assignedTo: ["${userId}"],
            notes: "Make it responsive",
            isCompleted: false
          }) {
            id
            title
            isCompleted
          }
        }
      `
        };

        const res = await request(app).post('/graphql').set('Authorization', `Bearer ${token}`).send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.addSubtask.title).toBe("Build Login UI");
        subtaskId = res.body.data.addSubtask.id;
    });

    it('should fetch subtasks by taskId', async () => {
        const query = {
            query: `
        query {
          getSubtasksByTask(taskId: "${taskId}") {
            id
            title
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.getSubtasksByTask.length).toBeGreaterThan(0);
    });

    it('should fetch a single subtask by ID', async () => {
        const query = {
            query: `
        query {
          getSubtask(id: "${subtaskId}") {
            id
            title
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.getSubtask.id).toBe(subtaskId);
    });

});
