import { userQuery, userMutation } from './user';
import { topicQuery, topicMutation } from './forum/topic';
import { AuthentMutation, AuthentQuery } from './auth';

export default {
  Query: {
    ...userQuery,
    ...topicQuery,
    ...AuthentQuery,
  },
  Mutation: {
    ...userMutation,
    ...topicMutation,
    ...AuthentMutation,
  },
};
