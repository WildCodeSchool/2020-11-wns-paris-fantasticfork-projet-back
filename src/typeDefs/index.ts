import { gql } from 'apollo-server-express';

const typeDefs = gql`
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
  }

  type Response {
    date: String
    name: String
    message: String
  }

  type Query {
    topics: [Topic]
    topic(_id: ID): Topic
  }

  type Mutation {
    addResponse(name: String!, owner: [String!], origins: [String]): Response
  }
`;

export default typeDefs;
