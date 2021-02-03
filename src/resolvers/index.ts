import { userMutation } from './user';
import { topicQueries, topicMutation } from './forum/topic';

export default {
  Query: {
    ...topicQueries,
  },
  Mutation: {
    ...userMutation,
    ...topicMutation,
  },
};
