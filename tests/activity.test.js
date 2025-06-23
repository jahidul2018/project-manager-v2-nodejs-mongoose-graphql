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

let token, userId, projectId, activityId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Register and login user
    const regRes = await request(app).post('/graphql').send({
        query: `
      mutation {
        registerUser(input: {
          name: "Activity User",
          email: "activity@example.com",
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
          email: "activity@example.com",
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
          name: "Activity Project",
          owner: "${userId}",
          members: ["${userId}"]
        }) {
          id
        }
      }
    `
    });
    projectId = projectRes.body.data.addProject.id;
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('Activity Resolver Tests', () => {

    it('should log an activity', async () => {
        const query = {
            query: `
        mutation {
          addActivity(input: {
            userId: "${userId}",
            projectId: "${projectId}",
            action: "created a task",
            details: "Created task Initial Setup"
          }) {
            id
            action
            details
          }
        }
      `
        };

        const res = await request(app).post('/graphql').set('Authorization', `Bearer ${token}`).send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.addActivity.action).toBe("created a task");
        activityId = res.body.data.addActivity.id;
    });

    it('should fetch activity logs for a project', async () => {
        const query = {
            query: `
        query {
          getActivitiesByProject(projectId: "${projectId}") {
            id
            action
            details
            user {
              name
            }
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.getActivitiesByProject.length).toBeGreaterThan(0);
    });

});
