const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    enabled: Boolean!
  }

  input UpdatedUserInput {
    role: String
    enabled: Boolean
  }

  type Query {
    getUsers(size: Int!, page: Int!): UsersQuery
    getStaff(size: Int!, page: Int!, email: String!): UsersQuery
  }

  type UsersQuery {
    totalCount: Int!
    currentPage: Int!
    size: Int!
    content: [User]
  }

  type Mutation {
    signUp(name: String!, email: String!, password: String!): SignUpResponse
    signIn(email: String!, password: String!): LoginResponse
    updateUser(id: ID!, object: UpdatedUserInput): UserUpdateResponse
    deleteUser(id: ID!): UserDeleteResponse
    addMovie(name: String!, url: String!): MovieResponse
    updateMovie(id: ID!, startPoint: Int!): MovieResponse
    playMovie(id: ID!): MovieResponse
    stopMovie(id: ID!): MovieResponse
  }

  type SignUpResponse {
    user: User
    status: String
    error: String
  }

  type LoginResponse {
    user: User
    token: String
    error: String
  }

  type UserUpdateResponse {
    user: User
    status: String
    message: String
    error: String
  }

  type UserDeleteResponse {
    status: String
    message: String
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
