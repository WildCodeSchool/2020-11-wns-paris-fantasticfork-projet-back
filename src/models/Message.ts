import mongoose from 'mongoose';
export interface IMessage extends mongoose.Document {
  chatRoomId: string;
  userId: string;
  text: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IMessageInput {
  text: string;
  chatRoomId: string;
  userId: string;
}

const MessageModel = new mongoose.Schema(
  {
    chatRoomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatRoom',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMessage>('Message', MessageModel);
