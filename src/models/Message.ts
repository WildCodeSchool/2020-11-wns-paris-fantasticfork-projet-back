import mongoose from 'mongoose';

export interface IMessage extends mongoose.Document {
  text: string;
  userId: string;
  username: string;
  createdAt: Date;
  updatedAt?: Date;
}

const MessageSchema = new mongoose.Schema(
  {
    text: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    userId: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    username: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMessage>('Message', MessageSchema);
