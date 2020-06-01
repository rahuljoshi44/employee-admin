import React, { Component } from "react";
import EmployeeForm from "./employeeForm";
import Employee from "./employee";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

class Main extends Component {
  state = {
    employees: [],
  };

  componentDidMount = () => {
    this.getEmployees();
  };

  getEmployees = () => {
    axios.get("http://localhost:4000/api/employees/all").then((res) => {
      this.setState({ employees: res.data });
    });
  };

  handleAddEmployee = (username, number, email) => {
    axios
      .post("http://localhost:4000/api/employees/add", {
        username: username,
        number: number,
        email: email,
      })
      .then((res) => {
        this.getEmployees();
      });
  };

  handleSaveChanges = (id, username, number, email) => {
    axios
      .post("http://localhost:4000/api/employees/edit", {
        id: id,
        username: username,
        number: number,
        email: email,
      })
      .then((res) => {
        this.getEmployees();
      });
  };

  handleDeleteEmployee = (id) => {
    axios
      .post("http://localhost:4000/api/employees/delete", {
        id: id,
      })
      .then((res) => {
        this.getEmployees();
      });
  };

  render() {
    return (
      <>
        <h2 className="text-center">Admin</h2>
        <br />
        <Row>
          <Col sm={4} style={{ marginBottom: "15px" }}>
            <EmployeeForm onAddEmployee={this.handleAddEmployee} />
          </Col>
          <Col sm={8}>
            <Card>
              <Container>
                <h5
                  style={{
                    borderLeft: "8px solid royalblue",
                    marginTop: "10px",
                  }}
                >
                  &emsp;Employee list
                </h5>
                <hr />
                <p className="text-secondary">
                  <small>*Click on employee to edit.</small>
                </p>
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Phone No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.employees.map((employee, idx) => {
                      return (
                        <Employee
                          employee={employee}
                          id={idx}
                          onSaveChanges={this.handleSaveChanges}
                          onDeleteEmployee={this.handleDeleteEmployee}
                        />
                      );
                    })}
                  </tbody>
                </Table>
              </Container>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
export default Main;
