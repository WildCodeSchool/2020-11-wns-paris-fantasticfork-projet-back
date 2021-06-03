import mongoose from 'mongoose';

export interface IComment extends mongoose.Document {
  authorID: string;
  commentId: string;
  topicId: string;
  author: string;
  commentBody: string;
  like: number;
  dislike: number;
  createdAt: Date;
  updatedAt?: Date;
}
export interface ICommentUpdates extends mongoose.Document {
  authorID: string;
  commentId?: string;
  author?: string;
  commentBody?: string;
  like?: number;
  dislike?: number;
  updatedAt: Date;
}

const CommentModel = new mongoose.Schema(
  {
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      required: false,
    },
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
  },
  {
    // creates updatedAt & createdAt properties, containing timestamps
    // https://masteringjs.io/tutorials/mongoose/timestamps
    timestamps: true,
  }
);

export default mongoose.model<IComment>('Comment', CommentModel);
