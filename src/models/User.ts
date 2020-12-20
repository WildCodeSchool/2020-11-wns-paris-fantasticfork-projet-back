import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  created_at: Date,
});

export default mongoose.model('User', UserSchema);
