// app.use('/graphql', authMiddleware, graphqlHTTP((req) => ({
//     schema,
//     rootValue: resolvers,
//     context: { req },
//     graphiql: true,
// })));

const http = require('http');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/schemas');
const resolvers = require('./src/resolvers');
const authMiddleware = require('./src/middleware/auth');
const setupWebSocketServer = require('./src/wsServer');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use(authMiddleware);

app.use(
    '/graphql',
    graphqlHTTP((req) => ({
        schema,
        rootValue: resolvers,
        context: { req },
        graphiql: {
            subscriptionEndpoint: '/graphql',
        },
    }))
);

const httpServer = http.createServer(app);

// Attach WebSocket server
setupWebSocketServer(httpServer);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
