import { userQuery, userMutation } from './user';
import { topicQuery, topicMutation } from './forum/topic';
import { AuthQuery, AuthMutation } from './auth';

export default {
  Query: {
    ...userQuery,
    ...topicQuery,
    ...AuthQuery,
  },
  Mutation: {
    ...userMutation,
    ...topicMutation,
    ...AuthMutation,
  },
};
