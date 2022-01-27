const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 18,
  },
  email: { type: String, required: true, lowercase: true },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  hobbies: [String],
  address: {
    street: String,
    city: String,
  },
});

module.exports = mongoose.model("User", userSchema);

// User is name of table in database
