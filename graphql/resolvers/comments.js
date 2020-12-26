const { UserInputError, ForbiddenError } = require("apollo-server");
const { v4: uuidv4 } = require("uuid");

const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username, firstName, lastName } = checkAuth(context);

      const post = await Post.findById(postId);

      if (!post) throw new Error("Post not found");
      if (body.trim() === "") throw new UserInputError("Body can't be empty");

      post.comments.unshift({
        commentId: uuidv4(),
        body,
        username,
        firstName,
        lastName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      await post.save();
      return post;
    },
    editComment: async (_, { postId, commentId, body }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (!post) throw new Error("Post not found");
      if (body.trim() === "") throw new UserInputError("Body can't be empty");

      const commentIndex = post.comments.findIndex(
        (comment) => comment.commentId === commentId
      );

      const comment = post.comments[commentIndex];
      if (!comment) throw new Error("Comment not found");
      if (comment.username !== username)
        throw new ForbiddenError("Not allowed");

      post.comments[commentIndex] = {
        commentId: comment.commentId,
        username: comment.username,
        firstName: comment.firstName,
        lastName: comment.lastName,
        createdAt: comment.createdAt,
        body,
        updatedAt: new Date().toISOString(),
        edited: true,
      };

      await post.save();

      return post;
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (!post) throw new Error("Post not found");

      const commentIndex = post.comments.findIndex(
        (comment) => comment.commentId === commentId
      );

      if (post.comments[commentIndex].username !== username)
        throw new ForbiddenError("Not allowed");

      post.comments.splice(commentIndex, 1);

      await post.save();

      return post;
    },
  },
};
