const mongoose = require("mongoose");
const SujetSchema = new mongoose.Schema({
  sujet: String,
  messageSujet: String,
  reponses: [
    {
      date: String,
      name: String,
      message: String,
    },
  ],
  url: [String],
  tags: [String],
});

module.exports = mongoose.model('sujet3', SujetSchema);