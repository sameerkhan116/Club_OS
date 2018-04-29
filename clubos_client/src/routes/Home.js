import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Container, Message, Icon, List, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const user = (u) => {
  let status = 'No plan selected';
  if (u.agreement) {
    /* eslint-disable-next-line  */
    status = u.agreement.status;
  }
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

const ALL_USERS = gql`
  {
    allUsers {
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

const Home = () => (
  <Container text>
    <Menu color="red" inverted widths={4}>
      <Menu.Item
        name="active"
        as={Link}
        to="/status/active"
      >
        Active
      </Menu.Item>
      <Menu.Item
        name="active"
        as={Link}
        to="/status/inactive"
      >
        Inactive
      </Menu.Item>
      <Menu.Item
        name="active"
        as={Link}
        to="/status/suspended"
      >
        Suspended
      </Menu.Item>
      <Menu.Item
        name="active"
        as={Link}
        to="/status/collections"
      >
        Collections
      </Menu.Item>
    </Menu>
    <Query query={ALL_USERS}>
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
            <Message negative>
              <Message.Header>Error!!</Message.Header>
              <p>No users found</p>
            </Message>
          );
        }
        const { allUsers } = data;
        return (
          <Container text>
            <List divided verticalAlign="middle">
              {allUsers.map(user)}
            </List>
          </Container>
        );
      }}
    </Query>
  </Container>
);

export default Home;
