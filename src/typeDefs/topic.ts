import { gql } from 'apollo-server-express';

export default gql`
  type Topic {
    _id: ID
    authorID: ID
    username: String
    subject: String
    body: String
    url: [String]
    tags: [String]
    comments: [Comment]
    like: Int
    dislike: Int
    createdAt: Float
    updatedAt: Float
  }

  type Comment {
    _id: ID
    topicId: ID
    authorID: ID
    author: String
    commentBody: String
    like: Int
    dislike: Int
    createdAt: Float
    updatedAt: Float
  }

  extend type Query {
    topics: [Topic]
    topic(_id: ID!): Topic
  }

  extend type Mutation {
    createTopic(
      username: String!
      authorID: ID!
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
      like: Int
      dislike: Int
      updatedAt: Float
    ): Topic

    deleteTopic(_id: ID!): Topic

    createComment(
      topicId: ID!
      author: String!
      authorID: ID!
      commentBody: String!
    ): Comment

    updateComment(
      commentId: ID!
      commentBody: String
      like: Int
      dislike: Int
      updatedAt: Float
    ): Comment

    deleteComment(_id: ID!): Comment
  }
`;

// extend type Subscription {
//   newComment: [Topic!]
//   newComment: Topic!
// }
