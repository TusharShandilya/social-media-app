const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    updatedAt: String!
    username: String!
    firstName: String!
    lastName: String!
    edited: Boolean!
    likes: [Like]!
    likeCount: Int!
    comments: [Comment]!
    commentCount: Int!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  type Comment {
    id: ID!
    commentId: String!
    body: String!
    username: String!
    firstName: String!
    lastName: String!
    createdAt: String!
    updatedAt: String!
    edited: Boolean!
  }
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    createdAt: String!
    token: String!
  }
  type UserInfoAll {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    followerCount: Int!
    followingCount: Int!
    posts: [Post]!
  }
  type UserInfoBasic {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    followerCount: Int!
    followingCount: Int!
  }
  input RegisterInput {
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    """
    Post Query
    """
    getPosts: [Post]!
    getPost(postId: ID!): Post!
    """
    User Query
    """
    getUser(username: String!): UserInfoAll!
    getFollowers(username: String!): [UserInfoBasic]!
  }
  type Mutation {
    """
    User Mutations
    """
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    followUser(username: String!): UserInfoBasic!
    editUser(firstName: String, lastName: String, email: String!): User!
    resetPassword(password: String!): User!

    """
    Post Mutations
    """
    createPost(body: String!): Post!
    deletePost(postId: ID!): Post!
    editPost(postId: ID!, body: String!): Post!
    likePost(postId: ID!): Post!

    """
    Comment Mutations
    """
    createComment(postId: ID!, body: String!): Post!
    editComment(postId: ID!, commentId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
  }
`;
