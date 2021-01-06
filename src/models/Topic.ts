import mongoose from 'mongoose';
import { IComment } from './Comment';
export interface ITopic extends mongoose.Document {
  username: string;
  subject: string;
  body: string;
  date: Date;
  url: [string];
  tags: [string];
  comments: Array<IComment>;
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
  updated_at: {
    type: mongoose.SchemaTypes.Date,
  },
  url: [mongoose.SchemaTypes.String],
  tags: [mongoose.SchemaTypes.String],
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Comment',
    },
  ],
});

export default mongoose.model<ITopic>('Topic', TopicModel);
