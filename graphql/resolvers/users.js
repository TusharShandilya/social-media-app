const bcrypt = require("bcrypt");

const { UserInputError } = require("apollo-server");

const User = require("../../models/User");
const {
  validateRegistrationInput,
  validateLoginInput,
} = require("../../utils/validate-user");
const { findOne } = require("../../models/User");
const { JWT_SECRET } = require("../../config");

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
  Query: {},
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

      if (!valid) throw new UserInputError(errors);
      try {
        const user = findOne({ $or: [{ username }, { email }] });

        if (user) {
          if (user.username === username) {
            throw new UserInputError("Username already exists", {
              errors: {
                username: "This username is taken",
              },
            });
          } else if (user.email === email) {
            throw new UserInputError("Email already registered", {
              errors: {
                email: "This email is already registered",
              },
            });
          }
        } else {
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
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    login: async (_, { username, password }) => {
      const { valid, errors } = validateLoginInput(username, password);

      if (!valid) throw new UserInputError(errors);

      try {
        let user = await User.findOne(username);

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

        // generate token
      } catch (err) {
        throw new Error(err);
      }
    },
    editUser: async (_, { firstName, lastName, email }, context) => {},
    resetPassword: async (_, { password }, context) => {},
  },
};
