import mongoose from 'mongoose';

export interface IComment extends mongoose.Document {
  authorId: string;
  topicID: string;
  date: Date;
  body: string;
}

const CommentModel = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  topicID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true,
  },
  date: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  body: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

export default mongoose.model<IComment>('Comment', CommentModel);
