const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: String!
  }

  type Query {
    getUsers(size: Int!, page: Int!): UsersQuery
  }

  type UsersQuery {
    totalCount: Int!
    currentPage: Int!
    size: Int!
    content: [User]
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
    ): NewUserResponse
    signIn(email: String!, password: String!): LoginUserResponse
    addMovie(name: String!, url: String!): MovieResponse
    updateMovie(id: ID!, startPoint: Int!): MovieResponse
    playMovie(id: ID!): MovieResponse
    stopMovie(id: ID!): MovieResponse
  }

  type NewUserResponse {
    user: User
    status: String
    message: String
  }

  type LoginUserResponse {
    user: User
    token: String
    error: String
  }

  type MovieResponse {
    status: String!
    message: String!
  }

  type Movie {
    id: ID!
    name: String!
    url: String!
    startPoint: Int
  }
`;

module.exports = typeDefs;
