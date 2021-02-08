import { userQuery, userMutation } from './user';
import { topicQuery, topicMutation } from './forum/topic';
import { AuthentificationMutation } from './auth';

export default {
  Query: {
    ...userQuery,
    ...topicQuery,
  },
  Mutation: {
    ...userMutation,
    ...topicMutation,
    ...AuthentificationMutation,
  },
};
