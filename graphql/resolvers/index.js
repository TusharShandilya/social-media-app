const postResolvers = require("./posts");
const userResolvers = require("./users");

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comment.length,
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...postResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};
