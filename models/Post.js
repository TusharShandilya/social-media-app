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
      commentId: String,
      body: String,
      username: String,
      firstName: String,
      lastName: String,
      createdAt: String,
      updatedAt: String,
      edited: { type: Boolean, default: false },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = model("Post", PostSchema);
