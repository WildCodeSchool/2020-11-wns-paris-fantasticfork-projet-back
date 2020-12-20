import mongoose from 'mongoose';

const TopicModel = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  url: [String],
  tags: [String],
  responses: [
    {
      date: Date,
      name: String,
      message: String,
    },
  ],
});

export default mongoose.model('Topic', TopicModel);
