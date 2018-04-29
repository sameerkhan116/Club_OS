import React, { Component } from 'react';
import { Card, Header, Container, Message, Icon, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import AddSessionModal from './AddSessionModal';

const AGREEMENT = gql`
  query($userId: Int!) {
    findAgreement(userId: $userId) {
      userType
      agreement {
        clubId
        quantity
        due
        createdAt
        endAt
      }
    }
  }
`;

class Plan extends Component {
  state = {
    addSessionModal: false,
  }

  closeModal = () => {
    this.setState({
      addSessionModal: false,
    });
  }

  openModal = () => {
    this.setState({
      addSessionModal: true,
    });
  }

  render() {
    const { id } = this.props;
    return [
      <Container key="main-container">
        <Query query={AGREEMENT} variables={{ userId: id }}>
          {({ loading, error, data }) => {
        console.log(data);
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
        const {
        userType, agreement: {
            clubId, due, createdAt, endAt, quantity,
          },
        } = data.findAgreement;

        return (
          <Container>
            <Header as="h1" textAlign="center">Plan</Header>
            <Card centered fluid>
              <Card.Content>
                <Card.Header>
                  Status: {`${userType}`}
                </Card.Header>
                <Card.Description>
                  Balance Due: ${`${due}`}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Card.Description>
                  Plan start date: {`${createdAt}`}
                </Card.Description>
                <Card.Description>
                  Sessions: {`${quantity}`}
                </Card.Description>
                <Card.Description>
                  Plan end date: {`${endAt}`}
                </Card.Description>
                <Card.Meta>
                  Club ID: {`${clubId}`}
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <Button
                  fluid
                  color="black"
                  onClick={this.openModal}
                >
                  Add sessions
                </Button>
              </Card.Content>
            </Card>
          </Container>
        );
      }}
        </Query>
      </Container>,

      <AddSessionModal
        onClose={this.closeModal}
        open={this.state.addSessionModal}
        key="add-session"
        id={id}
      />,
    ];
  }
}

export default Plan;
