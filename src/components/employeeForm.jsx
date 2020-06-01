import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      number: "",
      email: "",
      errors: [],
    };
  }
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // check if entered email is valid
  validateEmail = () => {
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(this.state.email).toLowerCase());
  };

  // check if entered number is valid
  validateNumber = () => {
    const re = /^\d+$/;
    return re.test(String(this.state.number));
  };

  validateName = () => {
    return this.state.username.length > 0 && this.state.username.length <= 20;
  };
  // check if all form fields are valid
  validateForm = () => {
    var errors = [];
    var valid = true;
    if (!this.validateName()) {
      valid = false;
      errors.push("Invalid username.");
    }
    if (!this.validateEmail()) {
      valid = false;
      errors.push("Invalid email address.");
    }
    if (!this.validateNumber()) {
      valid = false;
      errors.push("Invalid phone number.");
    }
    this.setState({ errors }, () => {
      if (valid)
        this.props.onAddEmployee(
          this.state.username,
          this.state.number,
          this.state.email
        );
    });
  };

  render() {
    return (
      <Card>
        <Container>
          <h5 style={{ borderLeft: "8px solid royalblue", marginTop: "10px" }}>
            &emsp;Add employee
          </h5>
          <hr />
          {this.state.errors.length >= 0 ? (
            this.state.errors.map((error, idx) => {
              return (
                <h5 style={{ display: "inline" }}>
                  <Badge
                    key={idx}
                    style={{
                      background: "rgba(255,0,0,0.1)",
                      color: "rgba(255,0,0,0.9)",
                      marginBottom: "5px",
                    }}
                  >
                    {error}
                  </Badge>
                  &emsp;
                </h5>
              );
            })
          ) : (
            <></>
          )}
          <Form style={{ maringTop: "10px" }}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Enter username"
                type="text"
                onChange={this.handleInputChange}
                name="username"
                value={this.state.username}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                placeholder="Enter number"
                type="text"
                onChange={this.handleInputChange}
                name="number"
                value={this.state.number}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={this.handleInputChange}
                name="email"
                value={this.state.email}
              />
            </Form.Group>
            <Form.Group>
              <Button onClick={() => this.validateForm()}>Add</Button>
            </Form.Group>
          </Form>
        </Container>
      </Card>
    );
  }
}

export default EmployeeForm;
