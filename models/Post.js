const { Schema, model } = require("mongoose");

const PostSchema = Schema({
  body: String,
  createdAt: String,
  updatedAt: String,
  username: String,
  firstName: String,
  lastName: String,
  edited: { type: Boolean, default: false },
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  comments: [
    {
      body: String,
      username: String,
      edited: Boolean,
      createdAt: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Post", PostSchema);
