import React, { Component } from 'react';
import { Form, Header, Container, Button, Message, Segment } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class SelectPlan extends Component {
  state = {
    clubId: '',
    due: '',
    alert: '',
    status: '',
    endAt: moment().format('YYYY-MM-DD'),
    clubIdError: '',
    dueError: '',
    statusError: '',
  }

  onSubmit = async () => {
    this.setState({
      clubIdError: '',
      dueError: '',
      statusError: '',
    });

    const {
      clubId, due, alert, status, endAt,
    } = this.state;
    const { id } = this.props.match.params;

    const response = await this.props.mutate({
      variables: {
        userId: id, clubId, due, alert, status, endAt,
      },
    });

    console.log(response);

    const { ok, error } = response.data.validateAgreement;

    if (ok) {
      this.props.history.push(`/user/${id}`);
    } else {
      const err = {};
      error.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  dropDownValue = (e, { name, value }) => {
    this.setState({
      [name]: value,
    });
  }

  datePicker = (date) => {
    this.setState({
      endAt: date.format('YYYY-MM-DD'),
    });
  }

  render() {
    const {
      clubId, due, alert, status,
      clubIdError, statusError, dueError,
    } = this.state;

    const errorList = [];
    if (clubIdError) errorList.push(clubIdError);
    if (statusError) errorList.push(statusError);

    return (
      <Container text>
        <Segment>
          <Form onSubmit={this.onSubmit}>
            <Header as="h1" textAlign="center">Plan Options</Header>
            <Form.Group>
              <Form.Input
                fluid
                width={8}
                type="number"
                label="Club ID"
                placeholder="Club ID"
                value={clubId}
                name="clubId"
                onChange={this.onChange}
                error={!!clubIdError}
                required
              />
              <Form.Input
                fluid
                width={8}
                type="number"
                label="Balance Due"
                placeholder="Balance Due"
                value={due}
                name="due"
                step="0.01"
                error={!!dueError}
                onChange={this.onChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Dropdown
                width={8}
                selection
                onChange={this.dropDownValue}
                options={
                  [{ value: '', text: '(No Selection)' },
                  { value: 'expired', text: 'Expired' },
                  { value: 'cancelled', text: 'Cancelled' }]
                }
                label="Alert type"
                name="alert"
                placeholder="Alert"
                value={alert}
              />
              <Form.Dropdown
                width={8}
                selection
                onChange={this.dropDownValue}
                options={
                  [{ value: '', text: '(No Selection)' },
                  { value: 'active', text: 'Active' },
                  { value: 'inactive', text: 'Inactive' },
                  { value: 'suspended', text: 'Suspended' },
                  { value: 'collections', text: 'Collections' }]
                }
                label="Agreement Status"
                name="status"
                placeholder="Status"
                value={status}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Field width={6} required>
                <label htmlFor="endAt">End date</label>
                <DatePicker selected={moment()} onChange={this.datePicker} />
              </Form.Field>
              <Button size="large" floated="right" type="submit" color="violet">Done!</Button>
            </Form.Group>
          </Form>
          {errorList.length ? (
            <Message error header="Something went wrong" list={errorList} />
          ) : null}
        </Segment>
      </Container>
    );
  }
}

const VALIDATE_AGREEMENT = gql`
  mutation($userId: Int!, $clubId: Int!, $due: Float!, $alert: String, $endAt: String!, $status: String!) {
    validateAgreement(userId: $userId, clubId: $clubId, due: $due, alert: $alert, endAt: $endAt, status: $status) {
      ok
      agreement {
        clubId
        id
      }
      error {
        path
        message
      }
    }
  }
`;

export default graphql(VALIDATE_AGREEMENT)(SelectPlan);
