export default `
  type User {
    id: Int!
    firstname: String!
    lastname: String!
    usernmae: String!
    email: String!
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    error: [Error!]
  }

  type Query {
    allUsers: User!
    user(id: Int!): User!
  }

  type Mutation {
    register(firstname: String!, lastname: String!, email: String!, username: String!): RegisterResponse!
  }
`;
