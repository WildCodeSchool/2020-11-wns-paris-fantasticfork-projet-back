import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import 'dotenv/config';
import mongooseConnect from './config/mongodb';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import IUser from './models/User';

// Start Server
mongooseConnect();

// Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const user = new IUser(token);
    if (!user) throw new Error('you must be logged in'); 
    return { user }
  }

});

// init app
const app = express();
server.applyMiddleware({ app });

// eslint-disable-next-line no-console
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on ${port}`));
