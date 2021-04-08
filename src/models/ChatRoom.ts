import mongoose from 'mongoose';
import { IMessage } from './Message';

export interface IChatRoom extends mongoose.Document {
  participants: Array<IParticipant>;
  messages: Array<IMessage>;
  lastMessage: IMessage;
  unreadMessages: number;
  updatedAt?: Date;
  createdAt: Date;
}
export interface IParticipant extends mongoose.Document {
  userId: string;
  lastConnected: Date;
}

const ChatRoomModel = new mongoose.Schema(
  {
    participants: {
      type: [
        {
          userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Participant',
            required: true,
          },
          lastConnected: { type: Date, default: Date.now },
        },
      ],
    },
    messages: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Message',
      },
    ],
    lastMessage: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Message',
    },
    unreadMessages: {
      type: mongoose.SchemaTypes.Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IChatRoom>('ChatRoom', ChatRoomModel);
