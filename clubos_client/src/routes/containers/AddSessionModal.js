import React from 'react';
import { Form, Modal, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import { withFormik } from 'formik';

const inlineStyle = {
  modal: {
    marginTop: '0px !important',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

const AddSessionModal = ({
  open, onClose, values, handleChange, handleBlur, handleSubmit, isSubmitting,
}) => (
  <Modal
    style={inlineStyle.modal}
    size="small"
    open={open}
    onClose={onClose}
  >
    <Modal.Header>Add sessions</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Group>
          <Form.Input
            width={8}
            type="number"
            label="Number of sessions"
            placeholder="sessions"
            name="sessions"
            value={values.sessions}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </Form.Group>
        <Form.Group>
          <Button color="green" disabled={isSubmitting} onClick={handleSubmit} fluid>Add +</Button>
          <Button color="red" disabled={isSubmitting} onClick={onClose} fluid>Cancel</Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
);

const ADD_QUANTITY = gql`
  mutation($userId: Int!, $added: Int!) {
    addSession(userId: $userId, added: $added) {
      userId
      status
      quantity
    }
  }
`;

export default compose(
  graphql(ADD_QUANTITY),
  withFormik({
    mapPropsToValues: () => ({ sessions: '' }),
    handleSubmit: async (values, { props: { onClose, id, mutate }, setSubmitting, resetForm }) => {
      const response = await mutate({
        variables: {
          userId: id,
          added: values.sessions,
        },
      });
      console.log(response);
      onClose();
      resetForm();
      setSubmitting(false);
    },
  }),
)(AddSessionModal);
