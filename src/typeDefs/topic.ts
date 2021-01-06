import { gql } from 'apollo-server-express';

export default gql`
  type Topic {
    _id: ID
    username: String
    subject: String
    body: String
    date: String
    url: [String]
    tags: [String]
    comments: [Comment]
  }

  type Comment {
    _id: ID
    topicId: ID
    author: String
    commentBody: String
    date: String
    like: Int
    dislike: Int
    lastUpdateDate: String
  }

  extend type Query {
    topics: [Topic]
    topic(_id: ID!): Topic
  }

  extend type Mutation {
    createTopic(
      username: String!
      subject: String!
      body: String!
      url: [String]
      tags: [String]
    ): Topic

    updateTopic(
      _id: ID!
      username: String
      subject: String
      body: String
      url: [String]
      tags: [String]
    ): Topic

    deleteTopic(id: ID!): [Topic]

    createComment(topicId: ID!, author: String!, commentBody: String!): Comment

    updateComment(
      _id: ID!
      commentBody: String
      like: Int
      dislike: Int
    ): Comment

    deleteComment(_id: ID!): Comment
  }
`;

// extend type Subscription {
//   newComment: [Topic!]
//   newComment: Topic!
// }
