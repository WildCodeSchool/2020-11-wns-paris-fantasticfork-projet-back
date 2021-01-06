import mongoose from 'mongoose';
import { IComment } from './Comment';
export interface ITopic extends mongoose.Document {
  username: string;
  subject: string;
  body: string;
  date: Date;
  url: [string];
  tags: [string];
  comments: IComment[];
}

const TopicModel = new mongoose.Schema({
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  subject: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  body: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  date: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
  url: [mongoose.SchemaTypes.String],
  tags: [mongoose.SchemaTypes.String],
  comments: [
    {
      commentId: mongoose.Schema.Types.ObjectId,
      date: mongoose.SchemaTypes.Date,
      author: mongoose.SchemaTypes.String,
      commentBody: mongoose.SchemaTypes.String,
    },
  ],
});

export default mongoose.model<ITopic>('Topic', TopicModel);
