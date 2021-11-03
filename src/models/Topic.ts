import mongoose from 'mongoose';
import { IComment } from './Comment';
export interface ITopic extends mongoose.Document {
  username: string;
  authorID: string;
  subject: string;
  body: string;
  updatedAt?: Date;
  createdAt: Date;
  url: [string];
  tags: [string];
  comments: Array<IComment>;
  likes: [string];
}
export interface ITopicUpdates extends mongoose.Document {
  _id: string;
  username?: string;
  subject?: string;
  body?: string;
  url?: [string];
  tags?: [string];
  lastUpdateDate?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ILikeTopic extends mongoose.Document {
  userID: string;
  topicID: string;
}

const TopicModel = new mongoose.Schema(
  {
    username: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    authorID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    subject: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    body: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    url: [mongoose.SchemaTypes.String],
    tags: [mongoose.SchemaTypes.String],
    comments: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment',
      },
    ],
    likes: {
      type: [mongoose.SchemaTypes.ObjectId],
    },
    dislike: {
      type: mongoose.SchemaTypes.Number,
    },
  },
  {
    // creates updatedAt & createdAt properties, containing timestamps
    // https://masteringjs.io/tutorials/mongoose/timestamps
    timestamps: true,
  }
);

export default mongoose.model<ITopic>('Topic', TopicModel);
