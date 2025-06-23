// wsServer.js
const { useServer } = require('graphql-ws/lib/use/ws');
const { WebSocketServer } = require('ws');
const schema = require('./schemas'); // your GraphQL schema
const resolvers = require('./resolvers');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// Create executable schema with resolvers
const executableSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers
});

const setupWebSocketServer = (httpServer) => {
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });

    useServer(
        {
            schema: executableSchema,
            context: async (ctx, msg, args) => {
                // Optional: Authentication
                const token = ctx.connectionParams?.authorization?.split(' ')[1];
                return { user: token }; // Modify with JWT verify if needed
            }
        },
        wsServer
    );
};

module.exports = setupWebSocketServer;
