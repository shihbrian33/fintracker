import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

export class Step1 extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <h2>Step 1</h2>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            Enter column letter of each field below for the CSV being uploaded.
          </Card.Title>
          <Card.Text>
            E.g. Date is in column A of CSV, enter A in date field.
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Date*</Form.Label>
                <Form.Control
                  required
                  name="date"
                  value={this.props.vals["date"] ? this.props.vals["date"] : ""}
                  onChange={this.props.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Amount*</Form.Label>
                <Form.Control
                  required
                  name="amount"
                  value={
                    this.props.vals["amount"] ? this.props.vals["amount"] : ""
                  }
                  onChange={this.props.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Merchant</Form.Label>
                <Form.Control
                  name="merchant"
                  value={
                    this.props.vals["merchant"]
                      ? this.props.vals["merchant"]
                      : ""
                  }
                  onChange={this.props.handleChange}
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  name="category"
                  value={
                    this.props.vals["category"]
                      ? this.props.vals["category"]
                      : ""
                  }
                  onChange={this.props.handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Button
              variant="primary"
              type="submit"
              disabled={!this.props.valid}
            >
              Next Step
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default Step1;
