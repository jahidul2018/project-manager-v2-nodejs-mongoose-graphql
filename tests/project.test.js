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

let token, userId, projectId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Register and login a user first
    const register = await request(app).post('/graphql').send({
        query: `
      mutation {
        registerUser(input: {
          name: "Project Admin",
          email: "projectadmin@example.com",
          password: "123456",
          role: "admin"
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
          email: "projectadmin@example.com",
          password: "123456"
        }) {
          token
        }
      }
    `
    });
    token = login.body.data.login.token;
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('Project Resolver Tests', () => {

    it('should create a new project', async () => {
        const query = {
            query: `
        mutation {
          addProject(input: {
            name: "GraphQL Redesign",
            description: "New task system",
            owner: "${userId}",
            members: ["${userId}"],
            visibility: "team"
          }) {
            id
            name
          }
        }
      `
        };
        const res = await request(app)
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send(query);

        expect(res.status).toBe(200);
        expect(res.body.data.addProject.name).toBe("GraphQL Redesign");
        projectId = res.body.data.addProject.id;
    });

    it('should fetch the list of projects', async () => {
        const query = {
            query: `
        query {
          getProjects {
            id
            name
            description
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.getProjects.length).toBeGreaterThan(0);
    });

    it('should get a single project by ID', async () => {
        const query = {
            query: `
        query {
          getProject(id: "${projectId}") {
            id
            name
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.getProject.name).toBe("GraphQL Redesign");
    });

});
