import TopicModel, { ITopic } from '../../models/Topic';
import CommentModel, { IComment, ICommentUpdates } from '../../models/Comment';

export const topicQueries = {
  topics: async (): Promise<ITopic[]> => {
    const topics = await TopicModel.find({});
    const comments = await CommentModel.find({});

    const topicWithComment: ITopic[] = [];

    for (let i = 0; i < topics.length; i++) {
      for (let ii = 0; ii < comments.length; ii++) {
        if (topics[i]._id.equals(comments[ii].topicId)) {
          topics[i].comments.push(comments[ii]);
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
      comments.forEach((comment) => {
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
    const date = new Date(Date.now());
    const newTopic = {
      username,
      subject,
      body,
      date,
      url,
      tags,
    };
    const topic = new TopicModel(newTopic);
    return await topic.save();
  },

  // updateTopic
  updateTopic: async (
    _: unknown,
    topicUpdates: ITopicUpdates
  ): Promise<ITopic | null> => {
    topicUpdates.updated_at = new Date(Date.now());
    const topic = await TopicModel.findOneAndUpdate(
      { _id: topicUpdates._id },
      { $set: topicUpdates },
      { new: true }
    );
    return topic;
  },

  // deleteTopic
  deleteTopic: async (_: unknown, topicId: string): Promise<ITopic | null> => {
    const topic = TopicModel.findOneAndDelete({ _id: topicId });
    return topic;
  },

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

  updateComment: async (
    _: unknown,
    commentUpdates: ICommentUpdates
  ): Promise<IComment | null> => {
    const lastUpdateDate = new Date(Date.now());
    const _commentUpdates = { ...commentUpdates, lastUpdateDate };

    const result = await CommentModel.findByIdAndUpdate(
      { _id: commentUpdates.commentId },
      { $set: _commentUpdates },
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

interface ITopicUpdates {
  _id: string;
  username?: string;
  subject?: string;
  body?: string;
  url?: [string];
  tags?: [string];
  updated_at?: Date;
}
