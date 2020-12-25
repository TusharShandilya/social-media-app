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
    body: String!
    username: String!
    createdAt: String!
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
  input RegisterInput {
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getPosts: [Post]!
    getPost(postId: ID!): Post!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    editUser(firstName: String, lastName: String, email: String!): User!
    resetPassword(password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): Post!
    editPost(postId: ID!, body: String!): Post!
    createComment(postId: ID!, body: String!): Post!
    editComment(postId: ID!, commentId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;
