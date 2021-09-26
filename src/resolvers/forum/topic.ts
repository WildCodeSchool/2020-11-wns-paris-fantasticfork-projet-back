import TopicModel, { ITopic, ITopicUpdates } from '../../models/Topic';
import CommentModel, { IComment, ICommentUpdates } from '../../models/Comment';
import { AuthContext } from '../../middlewares/authenticateRequest'

export const topicQuery = {
  topics: async (): Promise<ITopic[]> => {
    const topics = await TopicModel.find({})
      .populate('comments')
      .exec()
      
    return topics
  },

  topic: async (_: unknown, topicId: ITopic['_id']): Promise<ITopic | null> => {
    const topic: ITopic | null = await TopicModel.findById(topicId)
      .populate('comments')
      .exec();

    return topic;
  },
};

export const topicMutation = {
  createTopic: async (
    _: unknown,
    { username, subject, body, url, tags, authorID }: ITopic
  ): Promise<ITopic> => {
    const newTopic = {
      username,
      authorID,
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
    { topicId, author, authorID, commentBody }: IComment
  ): Promise<IComment> => {
    const newComment = {
      topicId,
      author,
      authorID,
      commentBody,
    };
    const comment = await new CommentModel(newComment).save();
    const topic = await TopicModel.findByIdAndUpdate(topicId, {
      $push: { comments: comment },
    })
    return comment;
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
