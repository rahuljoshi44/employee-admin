import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Employee = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var username = React.createRef();
  var email = React.createRef();
  var number = React.createRef();

  // check if entered email is valid
  const validateEmail = () => {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email.current.value).toLowerCase());
  };

  // check if entered number is valid
  const validateNumber = () => {
    const re = /^\d+$/;
    return re.test(String(number.current.value));
  };

  // check if name is valid (greater than 0 and less than 20 chars)
  const validateName = () => {
    return (
      username.current.value.length > 0 && username.current.value.length <= 20
    );
  };

  const saveChanges = (event) => {
    if (validateEmail() && validateName() && validateNumber()) {
      props.onSaveChanges(
        props.employee._id,
        username.current.value,
        number.current.value,
        email.current.value
      );
    }
    handleClose();
  };
  return (
    <>
      <tr variant="primary" onClick={handleShow}>
        <td>{props.id + 1}</td>
        <td>{props.employee.username}</td>
        <td>{props.employee.email}</td>
        <td>{props.employee.number}</td>
      </tr>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit employee {props.employee.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                ref={username}
                name="username"
                defaultValue={props.employee.username}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                ref={email}
                name="email"
                defaultValue={props.employee.email}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Number</Form.Label>
              <Form.Control
                required
                ref={number}
                name="number"
                defaultValue={props.employee.number}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              props.onDeleteEmployee(props.employee._id);
              handleClose();
            }}
          >
            Delete
          </Button>
          <Button variant="primary" onClick={() => saveChanges()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Employee;
