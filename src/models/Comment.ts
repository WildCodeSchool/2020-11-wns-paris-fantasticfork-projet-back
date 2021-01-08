import mongoose from 'mongoose';

export interface IComment extends mongoose.Document {
  // authorId: string;
  commentId: string;
  topicId: string;
  author: string;
  commentBody: string;
  date: Date;
  like: number;
  dislike: number;
  lastUpdateDate: Date;
}
export interface ICommentUpdates extends mongoose.Document {
  // authorId: string;
  commentId?: string;
  author?: string;
  commentBody?: string;
  like?: number;
  dislike?: number;
  lastUpdateDate?: Date;
}

const CommentModel = new mongoose.Schema({
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: false,
  },
  // authorId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
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
  date: {
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
  lastUpdateDate: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
});

export default mongoose.model<IComment>('Comment', CommentModel);
