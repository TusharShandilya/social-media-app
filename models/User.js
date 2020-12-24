const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  username: { type: String, unique: true },
  firstName: String,
  lastName: String,
  email: String,
  createdAt: String,
  password: String,
});

module.exports = model("User", UserSchema);
