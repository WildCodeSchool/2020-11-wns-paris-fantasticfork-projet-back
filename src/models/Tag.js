const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String
});

module.exports = mongoose.model('Tag', TagSchema)