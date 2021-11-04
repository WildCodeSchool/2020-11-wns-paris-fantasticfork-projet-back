import mongoose from 'mongoose';

export interface IComment extends mongoose.Document {
  authorID: string;
  topicId: string;
  author: string;
  commentBody: string;
  like: number;
  dislike: number;
  createdAt: Date;
  updatedAt?: Date;
  votersIdLikes: string[];
  votersIdDislikes: string[];
}
export interface ICommentUpdates extends mongoose.Document {
  authorID: string;
  topicId?: string;
  author?: string;
  commentBody?: string;
  like?: number;
  dislike?: number;
  updatedAt: Date;
  commentId: string;
  votersIdLikes: string[];
  votersIdDislikes: string[];
  voteType: string;
}

export interface ILikeDislike extends mongoose.Document {
  authorID: string;
  topicId?: string;
  author?: string;
  commentBody?: string;
  like?: number;
  dislike?: number;
  updatedAt: Date;
  commentId: string;
  voterID: string;
  votersIdLikes: string[];
  votersIdDislikes: string[];
  voteType: string;
}

const CommentModel = new mongoose.Schema(
  {
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
    author: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    commentBody: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    like: {
      type: mongoose.SchemaTypes.Number,
      required: false,
    },
    dislike: {
      type: mongoose.SchemaTypes.Number,
      required: false,
    },
    votersIdLikes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    }],  
    votersIdDislikes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    }]
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IComment>('Comment', CommentModel);
