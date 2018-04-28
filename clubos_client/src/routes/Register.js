import React, { Component } from 'react';
import { Form, Header, Container, Button, Message, Radio } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Register extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    age: '',
    gender: 'Male',
    location: '',
    firstnameError: '',
    lastnameError: '',
    emailError: '',
    ageError: '',
    genderError: '',
    locationError: '',
  };

  onSubmit = async () => {
    this.setState({
      firstnameError: '',
      lastnameError: '',
      emailError: '',
      locationError: '',
    });

    const {
      firstname, lastname, email, gender, age, location,
    } = this.state;
    const response = await this.props.mutate({
      variables: {
        firstname, lastname, email, gender, age, location,
      },
    });

    console.log(response);

    const { ok, user, error } = response.data.register;

    if (ok) {
      this.props.history.push(`/user/${user.id}`);
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

  radioChange = (e, { value }) => {
    this.setState({
      gender: value,
    });
  }

  render() {
    const {
      firstname, lastname, email, gender, age, location,
      firstnameError, lastnameError, emailError, genderError,
      ageError, locationError,
    } = this.state;

    const errorList = [];
    if (firstnameError) errorList.push(firstnameError);
    if (lastnameError) errorList.push(lastnameError);
    if (emailError) errorList.push(emailError);
    if (genderError) errorList.push(genderError);
    if (ageError) errorList.push(ageError);
    if (locationError) errorList.push(locationError);

    return (
      <Container text>
        <Form onSubmit={this.onSubmit}>
          <Header as="h1" textAlign="center">Add a new Customer</Header>
          <Form.Input
            fluid
            type="text"
            label="First Name"
            placeholder="First Name"
            value={firstname}
            name="firstname"
            onChange={this.onChange}
            error={!!firstnameError}
            required
          />
          <Form.Input
            fluid
            type="text"
            label="Last Name"
            placeholder="Last Name"
            value={lastname}
            name="lastname"
            onChange={this.onChange}
            error={!!lastnameError}
            required
          />
          <Form.Input
            fluid
            type="email"
            label="Email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={this.onChange}
            error={!!emailError}
            required
          />
          <Form.Field>
            <label htmlFor="gender">Gender</label>
          </Form.Field>
          <Form.Field>
            <Radio label="Male" value="Male" checked={gender === 'Male'} onChange={this.radioChange} />
          </Form.Field>
          <Form.Field>
            <Radio label="Female" type="radio" value="Female" checked={gender === 'Female'} onChange={this.radioChange} />
          </Form.Field>
          <Form.Group>
            <Form.Input
              width={6}
              type="number"
              placeholder="Age"
              value={age}
              label="Age (in years)"
              name="age"
              onChange={this.onChange}
              error={!!ageError}
              required
            />
            <Form.Input
              width={6}
              type="number"
              placeholder="Area Code"
              value={location}
              label="Area Code"
              name="location"
              onChange={this.onChange}
              error={!!locationError}
              required
            />
          </Form.Group>
          <Button size="large" floated="right" type="submit" primary>Next steps →</Button>
        </Form>
        {errorList.length ? (
          <Message error header="Something went wrong" list={errorList} />
        ) : null}
      </Container>
    );
  }
}

const ADD_USER = gql`
  mutation($firstname: String!, $lastname: String!, $email: String!, $gender: String!, $age: Int!, $location: Int!) {
    register(firstname: $firstname, lastname: $lastname, email: $email, gender: $gender, age: $age, location: $location) {
      ok
      user {
        id
      }
      error {
        path
        message
      }
    }
  }
`;

export default graphql(ADD_USER)(Register);
