import mongoose from 'mongoose';

const TagModel = new mongoose.Schema({
  title: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  description: mongoose.SchemaTypes.String,
});

export default mongoose.model('Tag', TagModel);
