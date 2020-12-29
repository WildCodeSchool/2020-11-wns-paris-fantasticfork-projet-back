import { topicQueries, topicMutation } from './forum/topic';

export default {
  Query: {
    ...topicQueries,
  },
  Mutation: {
    ...topicMutation,
  },
};
