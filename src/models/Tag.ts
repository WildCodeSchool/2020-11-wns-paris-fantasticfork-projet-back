import mongoose from 'mongoose';

const TagModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
});

export default mongoose.model('Tag', TagModel);
