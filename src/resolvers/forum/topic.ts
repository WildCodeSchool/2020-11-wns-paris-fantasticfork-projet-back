import TopicModel, { ITopic } from '../../models/Topic';
import CommentModel, { IComment } from '../../models/Comment';

export const topicQueries = {
  topics: async (): Promise<ITopic[]> => {
    const topics = await TopicModel.find({});
    const topicWithComment: ITopic[] | PromiseLike<ITopic[]> = [];
    topics.forEach(async (topic) => {
      const targetComments = await CommentModel.find({ topicId: topic._id });
      targetComments.forEach((comment) => {
        topic.comments.push(comment);
      });
      topicWithComment.push(topic);
    });

    return topicWithComment;
  },

  topic: async (_: unknown, topicId: ITopic['_id']): Promise<ITopic | null> => {
    const topic: ITopic | null = await TopicModel.findById(topicId);
    const comments = await CommentModel.find({
      topicId: topicId._id,
    });

    if (topic) {
      comments.forEach((comment) => topic.comments.push(comment));
    }

    return topic;
  },
};

export const topicMutation = {
  createTopic: async (
    _: unknown,
    { username, subject, body, url, tags }: ITopic
  ): Promise<ITopic> => {
    const date = new Date(Date.now());
    const newTopic = {
      username,
      subject,
      body,
      url,
      tags,
      date,
    };
    const topic = new TopicModel(newTopic);
    return await topic.save();
  },
  // updateTopic
  // deleteTopic

  createComment: async (
    _: unknown,
    { topicId, author, commentBody }: IComment
  ): Promise<IComment> => {
    const date = new Date(Date.now());
    const newComment = {
      topicId,
      author,
      commentBody,
      date,
    };
    const commentModel = new CommentModel(newComment);
    return await commentModel.save();
  },
};
