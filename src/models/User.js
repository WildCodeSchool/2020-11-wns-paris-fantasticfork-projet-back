const mongoose = require("mongoose");
const TopicSchema = new mongoose.Schema({
  name!: String,
  created_at: Date
});

module.exports = mongoose.model('User', TopicSchema);