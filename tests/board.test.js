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

let token, userId, projectId, boardId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Register user
    const register = await request(app).post('/graphql').send({
        query: `
      mutation {
        registerUser(input: {
          name: "Board Admin",
          email: "boardadmin@example.com",
          password: "123456",
          role: "admin"
        }) {
          id
        }
      }
    `
    });
    userId = register.body.data.registerUser.id;

    // Login
    const login = await request(app).post('/graphql').send({
        query: `
      mutation {
        login(input: {
          email: "boardadmin@example.com",
          password: "123456"
        }) {
          token
        }
      }
    `
    });
    token = login.body.data.login.token;

    // Create project
    const createProject = await request(app)
        .post('/graphql')
        .set('Authorization', `Bearer ${token}`)
        .send({
            query: `
        mutation {
          addProject(input: {
            name: "Board Project",
            description: "For testing board",
            owner: "${userId}",
            members: ["${userId}"]
          }) {
            id
          }
        }
      `
        });
    projectId = createProject.body.data.addProject.id;
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('Board Resolver Tests', () => {

    it('should create a new board', async () => {
        const query = {
            query: `
        mutation {
          addBoard(input: {
            name: "Development Board",
            projectId: "${projectId}",
            columns: [
              { name: "Backlog", order: 1 },
              { name: "To Do", order: 2 },
              { name: "In Progress", order: 3 },
              { name: "Done", order: 4 }
            ]
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
        expect(res.body.data.addBoard.name).toBe("Development Board");
        boardId = res.body.data.addBoard.id;
    });

    it('should fetch boards by project ID', async () => {
        const query = {
            query: `
        query {
          getBoardsByProject(projectId: "${projectId}") {
            id
            name
            columns {
              name
              order
            }
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.getBoardsByProject.length).toBeGreaterThan(0);
    });

    it('should get a single board by ID', async () => {
        const query = {
            query: `
        query {
          getBoard(id: "${boardId}") {
            id
            name
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.getBoard.name).toBe("Development Board");
    });

});
