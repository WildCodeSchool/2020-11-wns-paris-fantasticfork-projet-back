const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    author!: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    date!: Date,
    body!: String
});

module.exports = mongoose.model('Comment', CommentSchema);