import React from 'react';
import { Card, Header, Container, Message, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const AGREEMENT = gql`
  query($userId: Int!) {
    findAgreement(userId: $userId) {
      id
      clubId
      due
      active
      renew
      quantity
      agreement
      alert
      status
      createdAt
    }
  }
`;

const Plan = ({ id }) => (
  <Container>
    <Query query={AGREEMENT} variables={{ userId: id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <Message icon>
              <Icon name="circle notched" loading />
              <Message.Content>
                <Message.Header>Just one second</Message.Header>
                We are fetching that content for you.
              </Message.Content>
            </Message>
          );
        }
        if (error) {
          return (
            <Message warning>
              <Message.Header>Uh oh...</Message.Header>
              <p>No plan associated with this account. Please select a plan.</p>
            </Message>
          );
        }
        return (
          <Container>
            <Header as="h1" textAlign="center">Plan</Header>
            <Card centered fluid>
              Hello
            </Card>
          </Container>
        );
      }}
    </Query>
  </Container>
);

export default Plan;
