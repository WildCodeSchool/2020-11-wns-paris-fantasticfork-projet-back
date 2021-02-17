import TopicModel, { ITopic, ITopicUpdates } from '../../models/Topic';
import CommentModel, { IComment, ICommentUpdates } from '../../models/Comment';

export const topicQuery = {
  topics: async (): Promise<ITopic[]> => {
    const topics = await TopicModel.find({});
    const comments = await CommentModel.find({});

    const topicWithComment: ITopic[] = [];

    for (let i = 0; i < topics.length; i++) {
      for (let j = 0; j < comments.length; j++) {
        if (topics[i]._id.equals(comments[j].topicId)) {
          topics[i].comments.push(comments[j]);
        }
      }
      topicWithComment.push(topics[i]);
    }
    return topicWithComment;
  },

  topic: async (_: unknown, topicId: ITopic['_id']): Promise<ITopic | null> => {
    const topic: ITopic | null = await TopicModel.findById(topicId);
    const comments = await CommentModel.find({
      topicId: topicId._id,
    });

    if (topic) {
      comments.forEach((comment: IComment) => {
        topic.comments.push(comment);
      });
    }

    return topic;
  },
};

export const topicMutation = {
  createTopic: async (
    _: unknown,
    { username, subject, body, url, tags }: ITopic
  ): Promise<ITopic> => {
    const newTopic = {
      username,
      subject,
      body,
      url,
      tags,
    };
    const topic = new TopicModel(newTopic);
    return await topic.save();
  },

  updateTopic: async (
    _: unknown,
    topicUpdates: ITopicUpdates
  ): Promise<ITopic | null> => {
    const topic = await TopicModel.findOneAndUpdate(
      { _id: topicUpdates._id },
      { $set: topicUpdates },
      { new: true }
    );
    return topic;
  },

  deleteTopic: async (_: unknown, topicId: string): Promise<ITopic | null> => {
    const topic = TopicModel.findOneAndDelete({ _id: topicId });
    return topic;
  },

  createComment: async (
    _: unknown,
    { topicId, author, commentBody }: IComment
  ): Promise<IComment> => {
    const newComment = {
      topicId,
      author,
      commentBody,
    };
    const commentModel = new CommentModel(newComment);
    return await commentModel.save();
  },

  updateComment: async (
    _: unknown,
    commentUpdates: ICommentUpdates
  ): Promise<IComment | null> => {
    const result = await CommentModel.findByIdAndUpdate(
      { _id: commentUpdates.commentId },
      { $set: commentUpdates },
      { new: true }
    );
    return result;
  },

  deleteComment: async (
    _: unknown,
    commentId: string
  ): Promise<IComment | null> => {
    return await CommentModel.findOneAndDelete({ _id: commentId });
  },
};
