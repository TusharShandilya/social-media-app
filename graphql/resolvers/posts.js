module.exports = {
  Query: {
    getPosts: async (_, {}) => {},
    getPost: async (_, { postId }) => {},
  },
  Mutation: {
    createPost: async (_, { body }, context) => {},
    editPost: async (_, { postId, body }, context) => {},
    deletePost: async (_, { postId }, context) => {},
    createComment: async (_, { postId, body }, context) => {},
    editComment: async (_, { postId, commentId, body }, context) => {},
    deleteComment: async (_, { postId, commentId }, context) => {},
    likePost: async (_, { postId }, context) => {},
  },
};
