import { gql } from 'apollo-server-express';

export default gql`
  type IMessageOutput {
    text: String
    userId: String
    username: String
    date: String
  }

  extend type Mutation {
    newMessage(
      text: String!
      userId: String!
      username: String!
    ): IMessageOutput
  }

  extend type Subscription {
    chatSubscribed: String # renvoyer un type message
  }
`;
