import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import 'dotenv/config';
import mongooseConnect from './config/mongodb';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

import authenticateRequest from './middlewares/authenticateRequest';

// Start Server
mongooseConnect();

// Apollo server
const server = new ApolloServer({
  subscriptions: {
    path: '/graphql',
  },
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: authenticateRequest,
});

// init app
const app = express();

server.applyMiddleware({ app });

// eslint-disable-next-line no-console
const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server started on ${port}`, server.subscriptionsPath)
);
