const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  username: String,
  subject: String,
  body: String,
  date: Date,
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

module.exports = mongoose.model('Topic', TopicSchema);
