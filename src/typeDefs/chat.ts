import { gql } from 'apollo-server-express';

export default gql`
  type IChatRoom {
    _id: String
    participants: [IParticipant]
    messages: [IMessage]
    lastMessage: IMessage
    unreadMessages: Int
    updatedAt: Float
    createdAt: Float
  }

  type IParticipant {
    userId: String!
    name: String
    lastConnected: Float
  }

  input ChatRoomInput {
    userId: String!
    name: String!
  }

  type IMessage {
    text: String!
    userId: String!
    chatRoomId: String!
    createdAt: Float!
  }

  extend type Mutation {
    newChatRoom(participants: [ChatRoomInput!]): IChatRoom

    connectedToChatRoom(chatRoomId: String!): IChatRoom

    newMessage(text: String!, userId: String!, chatRoomId: String!): IMessage
  }

  extend type Query {
    myChatRooms(userId: String!): [IChatRoom]

    messages: [IMessage]
  }

  extend type Subscription {
    chatFeed: IMessage
  }
`;
