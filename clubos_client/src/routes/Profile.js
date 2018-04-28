import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Message, Container, Icon, Button, Card, Image, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Plan from './containers/Plan';

const USER = gql`
  query($id: Int!) {
    user(id: $id) {
      id
      firstname
      lastname
      email
      createdAt
      age
      gender
      location
    } 
  }
`;

const Profile = ({ match: { params: { id } } }) => (
  <Container text>
    <Query query={USER} variables={{ id }}>
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
              <p>Bad request or that user doesn't exist</p>
            </Message>
          );
        }
        const {
          firstname, lastname, email, createdAt, age, gender, location,
        } = data.user;
        return (
          <Container text>
            <Header as="h1" textAlign="center">Customer Details</Header>
            <Card centered fluid>
              <Card.Content>
                <Image floated="right" size="small" src="https://www.club-os.com/hubfs/Website%20Images/logo-white.png?t=1524854663136" />
                <Card.Header>
                  {`${firstname} ${lastname}`}
                </Card.Header>
                <Card.Meta>
                  {`${email}`}
                </Card.Meta>
                <Card.Description>
                  <strong>Gender:</strong> {`${gender}`}
                </Card.Description>
                <Card.Description>
                  <strong>Age:</strong> {`${age}`}
                </Card.Description>
                <Card.Description>
                  <strong>Joined:</strong> {`${createdAt}`}
                </Card.Description>
                <Card.Description>
                  <strong>Area code:</strong> {`${location}`}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button color="green" fluid as={Link} to="/select-plan">Modify current plan or choose a new one →</Button>
              </Card.Content>
            </Card>
            <hr />
            <Plan id={id} />
          </Container>
        );
      }}
    </Query>
  </Container>
);

// export default graphql(USER)(Profile);
export default Profile;
