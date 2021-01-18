const postResolvers = require("./posts");
const userResolvers = require("./users");
const commentResolvers = require("./comments");

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  User: {
    followerCount: (parent) => parent.followers.length,
    followingCount: (parent) => parent.following.length,
  },
  UserInfoAll: {
    followerCount: (parent) => parent.followers.length,
    followingCount: (parent) => parent.following.length,
  },
  Query: {
    ...postResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...postResolvers.Mutation,
    ...userResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};
