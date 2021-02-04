import { userQuery, userMutation } from './user';
import { topicQuery, topicMutation } from './forum/topic';
import { AuthentQuery } from './auth'

export default {
  Query: {
    ...userQuery,
    ...topicQuery,
    ...AuthentQuery,
  },
  Mutation: {
    ...userMutation,
    ...topicMutation,
  },
};
