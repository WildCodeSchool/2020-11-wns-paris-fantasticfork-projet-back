import TopicModel from '../../models/Topic';
import { ITopic } from '../../models/Topic';

export default {
  topics: async (): Promise<ITopic[]> => await TopicModel.find({}),
  topic: async (_: unknown, topicId: ITopic['_id']): Promise<ITopic | null> =>
    await TopicModel.findById(topicId),
};
