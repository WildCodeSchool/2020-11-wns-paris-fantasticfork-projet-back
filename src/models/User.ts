export {}
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  created_at: Date
});

module.exports = mongoose.model('User', UserSchema);