const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    author!: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      }
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tags'
      }
    ],
    body!: String,
    urls: [String]
});

module.exports = mongoose.Model('Topic', CommentSchema)