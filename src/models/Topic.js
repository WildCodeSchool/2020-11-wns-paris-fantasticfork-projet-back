const mongoose = require("mongoose");

// require needed models
require('../models/User')
require('../models/Comment')
require('../models/Tag')

const TopicSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
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
        ref: 'Tag'
      }
    ],
    body: {
      type: String,
      required: true
    },
    urls: [String]
});

module.exports = mongoose.model('Topics-v2', TopicSchema)