app.use('/graphql', authMiddleware, graphqlHTTP((req) => ({
    schema,
    rootValue: resolvers,
    context: { req },
    graphiql: true,
})));