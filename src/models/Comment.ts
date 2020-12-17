export {}
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    topicID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Topic',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    body: {
        type: String,
        required: true,
    }
});

module.exports.defalut = mongoose.model('Comment', CommentSchema);