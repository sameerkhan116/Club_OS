export default `
  type Agreement {
    id: Int!
    clubId: Int!
    due: Float!
    alert: String
    createdAt: String!
    status: String!
    quantity: Int!
    endAt: String!
  }

  type ValidateResponse {
    ok: Boolean!
    agreement: Agreement
    error: [Error!]
  }

  type AgreementResponse {
    agreement: Agreement!
    userType: String!
  }

  type Query {
    findAgreement(userId: Int!): AgreementResponse!
  }

  type Opportunity {
    userId: Int!
    quantity: Int!
    status: String!
  }

  type Mutation {
    validateAgreement(userId: Int!, clubId: Int!, due: Float!,  alert: String, endAt: String!, status: String!): ValidateResponse!
    addSession(userId: Int!, added: Int!): Opportunity! 
  }
`;
