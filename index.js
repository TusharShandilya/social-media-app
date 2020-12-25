const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGODB_SERVER_URL, PORT } = require("./config");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB_SERVER_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDb connected");
    return server.listen({ port: PORT || 5000 });
  })
  .then(({ url }) => {
    console.log(`Server running at ${url}`);
  });
