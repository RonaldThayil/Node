const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  socialLogin: {
    type: Boolean,
  },
});

module.exports = mongoose.model("UserDemoChecking", userSchema);
