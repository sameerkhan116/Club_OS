export default `
  type User {
    id: Int!
    firstname: String!
    lastname: String!
    email: String!
    createdAt: String!
    age: Int!
    gender: String!
    location: Int!
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    error: [Error!]
  }

  type Query {
    allUsers: [User!]!
    user(id: Int!): User!
  }

  type Mutation {
    register(firstname: String!, lastname: String!, gender: String!, age: Int!, location: Int!, email: String!): RegisterResponse!
  }
`;
