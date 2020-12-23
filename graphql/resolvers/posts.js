const { ForbiddenError } = require("apollo-server");
const Post = require("../../models/Post");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        let posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw Error(err);
      }
    },
    getPost: async (_, { postId }) => {
      try {
        let post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      // Check if the user is authorized
      const user = checkAuth(context);

      // Check if the body of the post is valid
      if (body.trim() === "") throw Error("Post body must not be empty");

      try {
        // Create the post object and save it
        const newPost = new Post({
          body,
          user: user.id,
          username: user.username,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        const post = await newPost.save();

        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
    editPost: async (_, { postId, body }, context) => {},
    deletePost: async (_, { postId }, context) => {
      // Check if the user is authorized
      const user = checkAuth(context);

      try {
        const post = await Post.findById({ id: postId });
        if (post.username === user.username) {
          post.delete();
          return post;
        } else {
          throw new ForbiddenError("Not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    createComment: async (_, { postId, body }, context) => {},
    editComment: async (_, { postId, commentId, body }, context) => {},
    deleteComment: async (_, { postId, commentId }, context) => {},
    likePost: async (_, { postId }, context) => {},
  },
};
