import { PubSub } from 'apollo-server-express';
const pubsub = new PubSub();

export const chatSubscription = {
  chatSubscribed: {
    subscribe: (): unknown => {
      pubsub.asyncIterator('NEW_MESSAGE');
      return 'Connected to the chat 😸';
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
    pubsub.publish('NEW_MESSAGE', { message });
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
