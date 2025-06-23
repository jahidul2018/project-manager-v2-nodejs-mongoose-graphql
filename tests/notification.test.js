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

let token, userId, notificationId;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Register and login user
    const regRes = await request(app).post('/graphql').send({
        query: `
      mutation {
        registerUser(input: {
          name: "Notify User",
          email: "notify@example.com",
          password: "123456"
        }) { id }
      }
    `
    });
    userId = regRes.body.data.registerUser.id;

    const loginRes = await request(app).post('/graphql').send({
        query: `
      mutation {
        login(input: {
          email: "notify@example.com",
          password: "123456"
        }) {
          token
        }
      }
    `
    });
    token = loginRes.body.data.login.token;
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('Notification Resolver Tests', () => {

    it('should create a notification', async () => {
        const query = {
            query: `
        mutation {
          addNotification(input: {
            recipient: "${userId}",
            message: "You were mentioned in a comment.",
            type: "comment_mention",
            link: "/task/123"
          }) {
            id
            message
          }
        }
      `
        };

        const res = await request(app).post('/graphql').set('Authorization', `Bearer ${token}`).send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.addNotification.message).toContain("mentioned");
        notificationId = res.body.data.addNotification.id;
    });

    it('should fetch notifications by user', async () => {
        const query = {
            query: `
        query {
          getNotificationsByUser(userId: "${userId}") {
            id
            message
            type
            isRead
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.getNotificationsByUser.length).toBeGreaterThan(0);
    });

    it('should mark a notification as read', async () => {
        const query = {
            query: `
        mutation {
          markNotificationAsRead(id: "${notificationId}") {
            id
            isRead
          }
        }
      `
        };

        const res = await request(app).post('/graphql').send(query);
        expect(res.status).toBe(200);
        expect(res.body.data.markNotificationAsRead.isRead).toBe(true);
    });

});
