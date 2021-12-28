require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/schema.js");
const cors = require("cors");
const resolvers = require("./graphql/resolvers");


async function startApolloServer(typeDefs, resolvers) {
  // Same ApolloServer initialization as before
  const server = new ApolloServer({ typeDefs, resolvers });

  // Required logic for integrating with Express
  await server.start();

  const app = express();
  app.use(cors());

  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/",
  });

  const db = require("./config/keys").mongoURI;

  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("ERROR", err));

  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

  const port = process.env.PORT || 5000;

  // Modified server startup
  await new Promise((resolve) => app.listen(port, resolve));
  console.log(`🚀 Server ready at ${port}${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers).then(() => console.log("start success"));
