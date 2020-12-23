const { AuthenticationError } = require("apollo-server");

const { JWT_SECRET } = require("../config");

module.exports = (context) => {
  let authHeader = context.req.headers.authorization;

  if (authHeader) {
    let token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid token");
      }
    } else {
      throw new Error("Invalid authentication token format");
    }
  } else {
    throw new Error("Authentication header must be provided");
  }
};
