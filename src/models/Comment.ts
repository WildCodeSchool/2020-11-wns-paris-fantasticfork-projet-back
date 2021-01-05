import mongoose from 'mongoose';

export interface IComment extends mongoose.Document {
  // authorId: string;
  topicId: string;
  author: string;
  commentBody: string;
  date: Date;
}

const CommentModel = new mongoose.Schema({
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
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
});

export default mongoose.model<IComment>('Comment', CommentModel);
