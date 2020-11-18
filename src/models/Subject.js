const mongoose = require("mongoose");
const SujetSchema = new mongoose.Schema({
  username: String,
  subject: String,
  body: String,
  date: Date,
  url: [String],
  tags: [String],
  responses: [{
      date: Date,
      name: String,
      message: String,
  }]
});

module.exports = mongoose.model('Subject', SujetSchema);