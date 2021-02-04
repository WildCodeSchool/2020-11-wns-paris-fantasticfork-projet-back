import { gql } from 'apollo-server-express';

export default gql`
    type AuthData {
        userID: String!
        token: String!
        tokenExpiration: Int!
    }

    extend type Query {
        login(email: String!, password: String!): AuthData!
    }

`;