import { PubSub, AuthenticationError, ApolloError } from 'apollo-server-express';
import { withFilter } from 'graphql-subscriptions';
import MessageModel, {
  IMessage,
  IMessageInput,
  IMessageOutput,
} from '../models/Message';
import ChatRoomModel, { IChatRoom } from '../models/ChatRoom';
import { AuthContext } from '../middlewares/authenticateRequest'

const pubsub = new PubSub();

export const chatSubscription = {
  chatFeed: {
    subscribe: withFilter(
      (_, __, context) => {
        if (context.userID) {
          return pubsub.asyncIterator(["NEW_MESSAGE"]);
        } else {
          throw new AuthenticationError('NOT AUTHORIZED');
        }
      },
      (payload, _, context) => {
        return !!(payload.participants.findIndex(p=> p.userID===context?.userId) === 0)
      }
    ),
  },
};

export const chatMutation = {
  newChatRoom: async (
    _: unknown,
    { participants }: { participants: ChatRoomInput[] },
    context:any
  ): Promise<IChatRoom | IChatRoom[]> => {

    // const params = {
    // "participants.userId": {$in: participants.map(m => m.userId)}
    // }

    const params = {
      "participants.userId": context.userID,
    }

    const participantsIdList = participants.map(p=>JSON.stringify(p.userId))

    const existRoom = (await ChatRoomModel.find(params)
      .populate('participants')
      .populate('messages')
      .populate('lastMessage')
      .exec())
      .filter(cr=>cr.participants.length === participants.length)
      .find(r =>{
        const idList = r.participants.map(p=>JSON.stringify(p.userId))
        return idList.every(p=>participantsIdList.includes(p)) 
        && participantsIdList.every(p=>idList.includes(p)) 
      })
    
    if(existRoom){
      return existRoom
    } else {
      return await new ChatRoomModel({ participants }).save();
    }
  },

  connectedToChatRoom: async (
    _: unknown,
    { chatRoomId }: ChatRoomInput,
    context:any
  ): Promise <any> => {
    // const myChatRoom = await ChatRoomModel.findById(chatRoomId)
    // const participants = myChatRoom?.participants.map((p) => {
    //   if (JSON.stringify(p.userId) === JSON.stringify(context.userID)) {
    //     return { ...p, lastConnected: Date.now() };
    //   } else {
    //     return p;
    //   }
    // });

    const userTimestampUpdate = await ChatRoomModel.findOneAndUpdate(
      { "_id":chatRoomId, "participants.userId": context.userID },
      { $set:{ "participants.$.lastConnected": Date.now() }},
      {new: true }
    );

    return userTimestampUpdate;
  },

  newMessage: async (
    _: unknown,
    { text, userId, chatRoomId }: IMessageInput,
    context:AuthContext
  ): Promise<IMessageOutput> => {
    const message = await new MessageModel({ text, userId, chatRoomId }).save();
    const chatroom = await ChatRoomModel.findByIdAndUpdate(chatRoomId, {
      $push: { messages: message },
      $set: { lastMessage: message },
      $inc: { unreadMessages: 1 },
    }, {new: true});

    pubsub.publish('NEW_MESSAGE', { chatFeed: message, participants: chatroom?.participants });
    return message;
  },
};

export const chatQuery = {
  myChatRooms: async (
    _: unknown,
    { userId }: ChatRoomInput,
    context:any
  ): Promise<unknown | null> => {
    const myChatRooms = (await ChatRoomModel.find({
      'participants.userId': userId,
    })
      .populate('messages')
      .populate('lastMessage')
      .exec())
      .map(cr => {
        const userLastConnected = cr.participants.find(p=>p.userId == context?.userID)?.lastConnected
        if(!userLastConnected){
          cr.unreadMessages = cr.messages.length
        } else {
          const unreadMessages = cr.messages.filter(msg => 
            msg.userId !== context.userID && msg.createdAt > new Date(userLastConnected)
          )
          cr.unreadMessages = unreadMessages.length
        }
        return cr
      })
      
    return myChatRooms;
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

