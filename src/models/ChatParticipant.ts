import mongoose from 'mongoose';

export interface IParticipant extends mongoose.Document {
  chatRoomId: string;
  userId: string;
  lastConnected: Date;
}

const ParticipantModel = new mongoose.Schema({
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
  lastConnected: {
    type: mongoose.SchemaTypes.Date,
    required: true,
  },
});

export default mongoose.model<IParticipant>('Participant', ParticipantModel);
