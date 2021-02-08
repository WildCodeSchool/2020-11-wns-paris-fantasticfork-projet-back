import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import 'dotenv/config';
import mongooseConnect from './config/mongodb';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

import isAuth from './middlewares/is-auth';

// Start Server
mongooseConnect();

// Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req }) => ({
    isAuth: req.isAuth,
    userID: req.userID,
  }),
});

// init app
const app = express();
app.use(isAuth);

server.applyMiddleware({ app });

// eslint-disable-next-line no-console
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on ${port}`));
