import MessageModel, {
  IMessage,
  IMessageInput,
  IMessageOutput,
} from '../models/Message';
import ChatRoomModel, { IChatRoom, IParticipant } from '../models/ChatRoom';
import { PubSub } from 'apollo-server-express';
import mongoose from 'mongoose';

const pubsub = new PubSub();

export const chatSubscription = {
  chatFeed: {
    subscribe: (): unknown => {
      return pubsub.asyncIterator(['NEW_MESSAGE']);
    },
  },
};

export const chatMutation = {
  newChatRoom: async (
    _: unknown,
    { participants }: { participants: ChatRoomInput[] }
  ): Promise<IChatRoom | IChatRoom[]> => {

    const params = {
      "participants.userId": {
        $in: participants.map(m => mongoose.Types.ObjectId(m.userId))
      }
    }
    const existRoom = (await ChatRoomModel.find(params)).find(cr=>cr.participants.length === participants.length)
      
    if(existRoom){
      return existRoom
    } else {
      return await new ChatRoomModel({ participants }).save();
    }
  },

  connectedToChatRoom: async (
    _: unknown,
    { chatRoomId, userId }: ChatRoomInput
  ): Promise<IChatRoom | null> => {
    const myChatRoom = await ChatRoomModel.findById(chatRoomId).exec();

    const participants = myChatRoom?.participants.map((p) => {
      if (p.userId == userId) {
        return { ...p, lastConnected: Date.now() };
      } else {
        return p;
      }
    });

    const updated = await ChatRoomModel.findByIdAndUpdate(chatRoomId, {
      participants: participants,
    });

    return updated;
  },

  newMessage: async (
    _: unknown,
    { text, userId, chatRoomId }: IMessageInput
  ): Promise<IMessageOutput> => {
    const message = await new MessageModel({ text, userId, chatRoomId }).save();
    await ChatRoomModel.findByIdAndUpdate(chatRoomId, {
      $push: { messages: message },
      $set: { lastMessage: message },
      $inc: { unreadMessages: 1 },
    });
    pubsub.publish('NEW_MESSAGE', { chatFeed: message });
    return message;
  },
};

export const chatQuery = {
  myChatRooms: async (
    _: unknown,
    { userId }: ChatRoomInput
  ): Promise<unknown | null> => {
    const myChatRooms = await ChatRoomModel.find({
      'participants.userId': userId,
    })
      .populate('messages')
      .populate('lastMessage')
      .exec();

    const data = JSON.parse(JSON.stringify(myChatRooms))[0];
    // const userLastConnected =
    //   data?.participants.filter((p: IParticipant) => p.userId === userId)
    //     .lastConnected || null;
    // console.log(data?.participants, userLastConnected);
    // const unReadMessages = data?.messages.filter(
    //   (m: IMessage) => m.createdAt > userLastConnected
    // );
    // data.unreadMessages = unReadMessages?.length;
    // console.log(userLastConnected, unReadMessages, data.unreadMessages);

    return data;
  },

  messages: async (): Promise<IMessage[]> => {
    const messages = await MessageModel.find({});
    return messages;
  },
};

interface ChatRoomInput {
  chatRoomId: string;
  userId: string;
}
function $and($and: any, condition: void) {
  throw new Error('Function not implemented.');
}

