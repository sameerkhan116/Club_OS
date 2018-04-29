import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Container, Message, Icon, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const user = (u) => {
  const { status } = u.agreement;
  return (
    <List.Item key={`${u.id}`}>
      <List.Content floated="right">
        <strong>Join date:</strong> {`${u.createdAt}`}
      </List.Content>
      <List.Content>
        <List.Header as={Link} to={`/user/${u.id}`}>{`${u.firstname} ${u.lastname}`}</List.Header>
        <List.Header>Status: {`${status}`}</List.Header>
        <List.Description>{`${u.email}`}</List.Description>
      </List.Content>
    </List.Item>
  );
};

const STATUS_USERS = gql`
  query($type: String!) {
    statusUsers(type: $type) {
      id
      firstname
      lastname
      email
      agreement {
        status
      }
      createdAt
    }
  }
`;

const Status = ({ match: { params: { type } } }) => (
  <Container text>
    <Query query={STATUS_USERS} variables={{ type }}>
      {({ loading, data }) => {
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
        const { statusUsers } = data;
        return (
          <Container text>
            <List divided verticalAlign="middle">
              {statusUsers.map(user)}
            </List>
          </Container>
        );
      }}
    </Query>
  </Container>
);

export default Status;
