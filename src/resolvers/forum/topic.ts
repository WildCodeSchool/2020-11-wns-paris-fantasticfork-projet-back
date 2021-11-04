import TopicModel, { ITopic, ITopicUpdates, ILikeTopic } from '../../models/Topic';
import CommentModel, { IComment, ICommentUpdates, ILikeDislike } from '../../models/Comment';
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

  handleLikeTopic: async (
    _: unknown,
    { topicID, userID }: ILikeTopic
  ): Promise<number | null> => {
    try {
      const topic = await TopicModel.findOne({ _id: topicID });
      
      if (topic) { 
        const userIdIndex = topic.likes.indexOf(userID);
        console.log(topic.likes.indexOf(userID))
        
        // if user didnt already liked topic
        if (userIdIndex === -1) {
          const likes = topic.likes;
          likes.push(userID);
          console.log(likes);
  
          try {
            const newTopic = await TopicModel.findOneAndUpdate(
              { _id: topicID },
              { $set: { likes } },
              { new: true }
            );
            
            if (newTopic) return newTopic.likes.length;
            else return null;
          } catch(e) {
            console.log(e);
            return null;
          }
        // if user already liked topic
        } else {
          const likes = topic.likes;
          likes.splice(userIdIndex);
          console.log(likes);


          try {
            const newTopic = await TopicModel.findOneAndUpdate(
              { _id: topicID },
              { $set: { likes } },
              { new: true }
            );
            
            if (newTopic) return newTopic.likes.length;
            else return null;
          } catch(e) {
            console.log(e);
            return null;
          }
        }
      } else {
        return null;
      }
    } catch(e) {
      console.log(e);
      return null;
    }
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
    const { commentId, voteType } = commentUpdates;
    const comment = await CommentModel.findOne({_id: commentId});
    
    if (comment) {
      const { votersIdLikes, votersIdDislikes} = comment;
      let updatedComment = { ...commentUpdates, votersIdLikes, votersIdDislikes };

      const result = await CommentModel.findByIdAndUpdate(
        { _id: commentId },
        { $set: commentUpdates },
        { new: true }
      );
      console.log(result)
      return result;
      
    } else {
      return null;
    }
  },

  deleteComment: async (
    _: unknown,
    commentId: string
  ): Promise<IComment | null> => {
    return await CommentModel.findOneAndDelete({ _id: commentId });
  },

  likeComment: async (
    _: unknown,
    commentUpdates: ILikeDislike
  ): Promise<IComment | null> => {
    const { commentId, voterID, voteType } = commentUpdates;
    const comment = await CommentModel.findOne({_id: commentId});
    let updatedComment;
    
    if (comment) {
      let votersIdLikes = comment.votersIdLikes;
      let votersIdDislikes = comment.votersIdDislikes;

      // if user didn't already liked or disliked the comment
      if (!votersIdLikes.includes(voterID) && !votersIdDislikes.includes(voterID)) {
        votersIdLikes.push(voterID); // adds user id in the comment's "likes" array

      // else if user already liked the comment
      } else if (votersIdLikes.includes(voterID)) {
        const index = votersIdLikes.indexOf(voterID);
        votersIdLikes.splice(index); // removes user id from the comment's "likes" array
        
      // else if user already disliked the comment
      } else if (votersIdDislikes.includes(voterID)) {
        votersIdLikes.push(voterID); // adds user id in the comment's "dislikes" array
        const index = votersIdDislikes.indexOf(voterID);
        votersIdDislikes.splice(index); // removes user id from the comment's "dislikes" array
      }

      updatedComment = { ...commentUpdates, votersIdDislikes, votersIdLikes };
      const result = await CommentModel.findByIdAndUpdate(
        { _id: commentId },
        { $set: updatedComment },
        { new: true }
      );
      return result;
      
    } else {
      return null;
    }
  },

  dislikeComment: async (
    _: unknown,
    commentUpdates: ILikeDislike
  ): Promise<IComment | null> => {
    const { commentId, voterID, voteType } = commentUpdates;
    const comment = await CommentModel.findOne({_id: commentId});
    let updatedComment;
    
    if (comment) {
      let votersIdLikes = comment.votersIdLikes;
      let votersIdDislikes = comment.votersIdDislikes;
      
      // if user didn't already liked or disliked the comment
      if (!votersIdDislikes.includes(voterID) && !votersIdLikes.includes(voterID)) {
        votersIdDislikes.push(voterID); // adds user id in the comment's "dislikes" array
        
        // else if user already disliked the comment
      } else if (votersIdDislikes.includes(voterID)) {
        const index = votersIdDislikes.indexOf(voterID);
        votersIdDislikes.splice(index); // // removes user id from the comment's "dislikes" array
        
        // else if user already liked the comment
      } else if (votersIdLikes.includes(voterID)) {
        votersIdDislikes.push(voterID); //add user id the the comment's "dislikes" array
        const index = votersIdLikes.indexOf(voterID);
        votersIdLikes.splice(index); // removes user id from the comment's dislikes array
      }

      updatedComment = { ...commentUpdates, votersIdDislikes, votersIdLikes };
      const result = await CommentModel.findByIdAndUpdate(
        { _id: commentId },
        { $set: updatedComment },
        { new: true }
      );
      return result;
      
    } else {
      return null;
    }
  },
}
