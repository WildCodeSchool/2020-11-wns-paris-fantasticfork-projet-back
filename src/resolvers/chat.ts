import MessageModel, {
  IMessage,
  IMessageInput,
  IMessageOutput,
} from '../models/Message';
import ChatRoomModel, { IChatRoom } from '../models/ChatRoom';
import ParticipantModel, { IParticipant } from '../models/ChatParticipant';
import { PubSub } from 'apollo-server-express';
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
    participants: Array<IParticipant>
  ): Promise<IChatRoom['_id']> => {
    const newChatRoom = await new ChatRoomModel(participants).save();

    const inputParticipants = [...participants.input].map(
      (participant: IParticipant) => ({
        userId: participant.userId,
        chatRoomId: newChatRoom._id,
        lastConnected: Date.now(),
      })
    );

    console.log(inputParticipants);

    console.log(newParticipants);

    return await ChatRoomModel.findById(newChatRoom._id);
  },

  newMessage: async (
    _: unknown,
    { text, userId, chatRoomId }: IMessageInput
  ): Promise<IMessageOutput> => {
    const message = await new MessageModel({ text, userId, chatRoomId }).save();
    pubsub.publish('NEW_MESSAGE', { chatFeed: message });
    return message;
  },
};

export const chatQuery = {
  messages: async (): Promise<IMessage[]> => {
    const messages = await MessageModel.find({});
    return messages;
  },
};
