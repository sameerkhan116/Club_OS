export default `
  type Agreement {
    id: Int!
    clubId: Int!
    due: Float!
    active: Boolean!
    renew: Boolean!
    quantity: Int!
    agreement: String!
    alert: String!
    status: String!    
    createdAt: String!
  }

  type ValidateResponse {
    ok: Boolean!
    agreement: Agreement
    error: [Error!]
  }

  type Query {
    findAgreement(userId: Int!): Agreement!
  }

  type Mutation {
    validateAgreement(userId: Int!, clubId: Int!, due: Float!, active: Boolean!, renew: Boolean!, quantity: Int!, agreement: String!, alert: String!): ValidateResponse!
  }
`;
