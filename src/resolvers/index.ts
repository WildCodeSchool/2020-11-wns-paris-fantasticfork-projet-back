import { userQuery, userMutation } from './user';
import { topicQuery, topicMutation } from './forum/topic';
import { AuthQuery, AuthMutation } from './auth';
import { chatSubscription, chatMutation, chatQuery } from './chat';

export default {
  Query: {
    ...userQuery,
    ...topicQuery,
    ...AuthQuery,
    ...chatQuery,
  },
  Mutation: {
    ...userMutation,
    ...topicMutation,
    ...AuthMutation,
    ...chatMutation,
  },
  Subscription: {
    ...chatSubscription,
  },
};
