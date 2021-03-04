import MessageModel, { IMessage } from '../models/Message';
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
  newMessage: async (
    _: unknown,
    { text, userId, username }: IMessageInput
  ): Promise<IMessageOutput> => {
    const message = await new MessageModel({ text, userId, username }).save();
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

interface IMessageInput {
  text: string;
  userId: string;
  username: string;
}

interface IMessageOutput extends IMessageInput {
  createdAt: Date;
}
