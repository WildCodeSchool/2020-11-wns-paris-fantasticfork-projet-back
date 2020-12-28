import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  created_at: mongoose.SchemaTypes.Date,
});

export default mongoose.model('User', UserSchema);
