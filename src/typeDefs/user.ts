import { gql } from 'apollo-server-express';

export default gql`
  type User {
    _id: ID
    email: String!
    password: String!
    firstname: String!
    lastname: String!
    tags: [String]
    role: String
    tokenVersion: Int
    createdAt: String
  }

  extend type Query {
    users: [User]
  }

  extend type Mutation {
    signUp(
      email: String!
      password: String!
      firstname: String!
      lastname: String!
      tags: [String]
      role: String
    ): AuthData
  }
`;
