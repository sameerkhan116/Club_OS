import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Container, Message, Icon, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const user = u => (
  <List.Item key={`${u.id}`}>
    <List.Content floated="right">
      {`${u.createdAt}`}
    </List.Content>
    <List.Content>
      <List.Header as={Link} to={`/user/${u.id}`}>{`${u.firstname} ${u.lastname}`}</List.Header>
      <List.Description>{`${u.email}`}</List.Description>
    </List.Content>
  </List.Item>
);

const Home = ({ data: { loading, allUsers } }) => (
  loading || !allUsers ?
    (
      <Message icon>
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>Just one second</Message.Header>
            We are fetching that content for you.
        </Message.Content>
      </Message>
    ) : (
      <Container>
        <List divided verticalAlign="middle">
          {allUsers.map(user)}
        </List>
      </Container>
    )
);

const ALL_USERS = gql`
  {
    allUsers {
      id
      firstname
      lastname
      email
      createdAt
    }
  }
`;

export default graphql(ALL_USERS)(Home);
