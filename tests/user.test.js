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

let userId, token;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('User Resolver Tests', () => {

    it('should register a user', async () => {
        const query = {
            query: `
        mutation {
          registerUser(input: {
            name: "Test User",
            email: "testuser@example.com",
            password: "123456",
            role: "admin"
          }) {
            id
            name
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.registerUser.name).toBe("Test User");
        userId = res.body.data.registerUser.id;
    });

    it('should login the user and return a token', async () => {
        const query = {
            query: `
        mutation {
          login(input: {
            email: "testuser@example.com",
            password: "123456"
          }) {
            token
            user {
              id
              name
            }
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.login.token).toBeDefined();
        token = res.body.data.login.token;
    });

    it('should retrieve a list of users', async () => {
        const query = {
            query: `
        query {
          getUsers {
            id
            name
            email
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.getUsers.length).toBeGreaterThan(0);
    });

    it('should retrieve a single user by ID', async () => {
        const query = {
            query: `
        query {
          getUser(id: "${userId}") {
            id
            name
            email
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.getUser.id).toBe(userId);
    });

});
