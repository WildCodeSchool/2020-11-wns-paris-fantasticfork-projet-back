import { gql } from 'apollo-server-express';

export default gql`
  type IChatRoom {
    _id: String
    participants: [IParticipant]
    messages: [IMessage]
    lastMessage: IMessage
    unreadMessages: Int
    updatedAt: String
    createdAt: String
  }

  type IParticipant {
    userId: String!
    name: String
    lastConnected: String
  }

  input ChatRoomInput {
    userId: String!
    name: String!
  }

  type IMessage {
    text: String!
    userId: String!
    chatRoomId: String!
    createdAt: String!
  }

  extend type Mutation {
    newChatRoom(participants: [ChatRoomInput!]): IChatRoom

    connectedToChatRoom(chatRoomId: String!, userId: String!): IChatRoom

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
