import { gql } from 'apollo-server-express';

export default gql`
  type AuthData {
    userID: String!
    token: String!
    tokenExpiration: String!
    tokenVersion: Int
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthData!
    revokeRefreshToken(userId: String!): Boolean!
  }

  #query to test an authorize token
  extend type Query {
    testAuth: String
  }
`;
