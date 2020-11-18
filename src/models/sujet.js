const mongoose = require("mongoose");
const SujetSchema = new mongoose.Schema({
  
  sujet: String,
  message: String,
  date: String,
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

module.exports = mongoose.model('sujet', SujetSchema);