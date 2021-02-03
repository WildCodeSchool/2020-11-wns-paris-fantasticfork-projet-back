import { userQuery, userMutation } from './user';
import { topicQuery, topicMutation } from './forum/topic';

export default {
  Query: {
    ...userQuery,
    ...topicQuery,
  },
  Mutation: {
    ...userMutation,
    ...topicMutation,
  },
};
