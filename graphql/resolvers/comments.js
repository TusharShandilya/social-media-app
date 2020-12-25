module.exports = {
  Mutations: {
    createComment: async (_, { postId, body }, context) => {},
    editComment: async (_, { postId, commentId, body }, context) => {},
    deleteComment: async (_, { postId, commentId }, context) => {},
  },
};
