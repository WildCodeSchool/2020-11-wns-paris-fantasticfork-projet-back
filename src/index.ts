import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';


const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(process.env.PORT || 4000, () => console.log(`Server runs on port :${process.env.APP_PORT} 🏃`));
