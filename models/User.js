const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  username: { type: String, unique: true },
  firstName: String,
  lastName: String,
  email: String,
  createdAt: String,
  password: String,
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

module.exports = model("User", UserSchema);
