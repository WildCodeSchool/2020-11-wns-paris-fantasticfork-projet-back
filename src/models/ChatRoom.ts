import mongoose from 'mongoose';
import { IParticipant } from './ChatParticipant';
import { IMessage } from './Message';

export interface IChatRoom extends mongoose.Document {
  participants: Array<IParticipant>;
  messages: Array<IMessage>;
  lastMessage: IMessage;
  unreadMessages: number;
  updatedAt?: Date;
  createdAt: Date;
}

const ChatRoomModel = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Participant',
        required: true,
      },
    ],
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
