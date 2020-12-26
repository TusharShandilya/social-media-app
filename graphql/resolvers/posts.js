const { ForbiddenError, UserInputError } = require("apollo-server");
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
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        const post = await newPost.save();

        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
    editPost: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (!post) throw new UserInputError("Post not found");

      if (post.username !== username) throw new ForbiddenError("Not allowed");

      post.edited = true;
      post.updatedAt = new Date().toISOString();
      post.body = body;

      await post.update(post);

      return post;
    },
    deletePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post.username === username) {
        post.delete();
        return post;
      } else {
        throw new ForbiddenError("Not allowed");
      }
    },
    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (!post) throw new Error("Post not found");

      if (post.likes.find((like) => like.username === username)) {
        // Like found
        post.likes = post.likes.filter((like) => like.username !== username);
      } else {
        // Like not found
        post.likes.push({ username, createdAt: new Date().toISOString() });

        await post.save();

        return post;
      }
    },
  },
};
