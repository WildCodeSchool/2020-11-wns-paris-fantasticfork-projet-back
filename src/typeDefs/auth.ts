import { gql } from 'apollo-server-express';

export default gql`
  type AuthData {
    userID: String!
    token: String!
    tokenExpiration: String!
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthData!
  }
`;