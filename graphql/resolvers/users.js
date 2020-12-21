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
      },
      context
    ) => {},
    login: async (_, { username, password }, context) => {},
    editUser: async (_, { firstName, lastName, email }, context) => {},
    resetPassword: async (_, { password }, context) => {},
  },
};
