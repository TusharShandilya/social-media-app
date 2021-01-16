const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const User = require("../../models/User");
const Post = require("../../models/Post");
const {
  validateRegistrationInput,
  validateLoginInput,
} = require("../../utils/validate-user");
const { JWT_SECRET } = require("../../config");
const checkAuth = require("../../utils/check-auth");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
};

module.exports = {
  Query: {
    getUser: async (_, { username }) => {
      const user = await User.findOne({
        username,
      });

      if (!user) throw new UserInputError("User not found");

      const { id, firstName, lastName, email, followers, following } = user;
      const userPosts = await Post.find({
        $or: [
          { username },
          { "comments.username": username },
          { "likes.username": username },
        ],
      }).sort({ createdAt: -1 });

      return {
        id,
        username,
        firstName,
        lastName,
        email,
        followerCount: followers.length,
        followingCount: following.length,
        posts: [...userPosts],
      };
    },
    getFollowers: async (_, { username }) => {},
  },
  Mutation: {
    register: async (
      _,
      {
        registerInput: {
          username,
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        },
      }
    ) => {
      const { valid, errors } = validateRegistrationInput(
        username,
        email,
        firstName,
        lastName,
        password,
        confirmPassword
      );

      if (!valid) throw new UserInputError("Invalid Input", { errors });

      const user = await User.findOne({ $or: [{ username }, { email }] });

      if (user) {
        let errors = {};
        if (user.username === username) {
          errors.username = "This username is taken";
        } else if (user.email === email) {
          errors.email = "This email is already registered";
        }

        throw new UserInputError("User already exists", { errors });
      } else {
        try {
          password = await bcrypt.hash(password, 12);
          const newUser = new User({
            username,
            email,
            firstName,
            lastName,
            password,
            createdAt: new Date().toISOString(),
          });

          const res = await newUser.save();

          const token = generateToken(res);

          return {
            ...res._doc,
            id: res._id,
            token,
          };
        } catch (err) {
          throw new Error(err);
        }
      }
    },
    login: async (_, { username, password }) => {
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) throw new UserInputError("Invalid Input", { errors });

      let user = await User.findOne({ username });

      if (!user) {
        throw new UserInputError("user not found", {
          errors: { general: "User not found" },
        });
      }
      // verify password

      const matchPassword = await bcrypt.compare(password, user.password);

      if (matchPassword) {
        let token = generateToken(user);
        return {
          ...user._doc,
          id: user._id,
          token,
        };
      } else {
        throw new UserInputError("Invalid credentials", {
          errors: { general: "Invalid credentials" },
        });
      }
    },
    followUser: async (_, { username }, context) => {
      try {
        const user = checkAuth(context);

        const currentUser = await User.findById(user.id);
        if (!currentUser) throw new UserInputError("Signed in user not found");

        const followUser = await User.findOne({ username });
        if (!followUser) throw new UserInputError("User not found");

        if (currentUser.id === followUser.id)
          throw new UserInputError("User can't follow themself");

        if (
          currentUser.following.find(
            (userId) => userId.toString() === followUser.id
          )
        ) {
          currentUser.following = currentUser.following.filter(
            (userId) => userId.toString() !== followUser.id
          );
          followUser.followers = followUser.followers.filter(
            (userId) => userId.toString() !== currentUser.id
          );
        } else {
          currentUser.following.unshift(followUser.id);
          followUser.followers.unshift(currentUser.id);
        }

        await currentUser.save();
        await followUser.save();

        return {
          id: currentUser.id,
          username: currentUser.username,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          followerCount: currentUser.followers.length,
          followingCount: currentUser.following.length,
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    editUser: async (_, { firstName, lastName, email }, context) => {},
    resetPassword: async (_, { password }, context) => {},
  },
};
