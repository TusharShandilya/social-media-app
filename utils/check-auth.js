const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = (context) => {
  let authHeader = context.req.headers.authorization;

  if (authHeader) {
    let token = authHeader.split("Bearer ")[1];
    if (token) {
      const user = jwt.verify(token, JWT_SECRET);
      return user;
    } else {
      throw new Error("Invalid authentication token format");
    }
  } else {
    throw new Error("Authentication header must be provided");
  }
};
