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
  newMessage: (
    _: unknown,
    { text, userId, username }: IMessageInput
  ): IMessageOutput => {
    const date = new Date();
    const message = {
      text,
      userId,
      username,
      date,
    };
    pubsub.publish('NEW_MESSAGE', { chatFeed: message });
    return message;
  },
};

interface IMessageInput {
  text: string;
  userId: string;
  username: string;
}

interface IMessageOutput extends IMessageInput {
  date: Date;
}
