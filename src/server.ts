import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import 'dotenv/config';
import cookieParser from 'cookie-parser';
import mongooseConnect from './config/mongodb';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

import refreshToken from './refreshToken';
import authenticateRequest from './middlewares/authenticateRequest';

// Start Server
mongooseConnect();

// Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: authenticateRequest,
});

// init app
const app = express();
app.use(cookieParser());
app.use('/refresh_token', refreshToken);

server.applyMiddleware({ app });

// eslint-disable-next-line no-console
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on ${port}`));
