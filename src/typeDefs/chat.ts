import { gql } from 'apollo-server-express';

export default gql`
  type IMessageOutput {
    text: String!
    userId: String!
    username: String!
    createdAt: String!
  }

  extend type Mutation {
    newMessage(
      text: String!
      userId: String!
      username: String!
    ): IMessageOutput
  }

  extend type Subscription {
    chatFeed: IMessageOutput
  }
`;
