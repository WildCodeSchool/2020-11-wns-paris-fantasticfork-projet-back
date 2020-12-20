import express from 'express';
import cors from 'cors';
import router from './routes';

import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

import TopicModel from './models/Topic';

// init app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use(router);

//GRAPHQL
//schemas
const schema = buildSchema(`
    type Query {
        topics: [Topic]
        topic(_id: ID): Topic
    },
    type Topic {
        _id: ID
        username: String
        subject: String
        body: String
        date: String
        url: [String]
        tags: [String]
        comments: [String]
        responses: [Response]
    },
    type Response {
        date: String
        name: String
        message: String
    },
    
`);

//resolvers

const getTopics = async function () {
  try {
    const topics = await TopicModel.find({});
    return topics;
  } catch (error) {
    console.log('err: ', error);
    return error;
  }
};

const getOneTopic = async function (args: Args) {
  const topic = await TopicModel.findById(args._id);
  return topic;
};

interface Args {
  _id: string;
}

const root = {
  topics: getTopics,
  topic: getOneTopic,
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

export default app;
