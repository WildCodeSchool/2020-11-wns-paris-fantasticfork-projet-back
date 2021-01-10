import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import typeDefs from '../typeDefs';
import resolvers from '../resolvers';

// Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

// init app
const app = express();
server.applyMiddleware({ app });

export default app;
