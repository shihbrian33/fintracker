import React, { Component, Fragment } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

export class ColumnDefine extends Component {
  onChange = (name, event) => {
    let val = event.target.value.toUpperCase();
    if (val.length >= 1) {
      val = val.charAt(val.length - 1);
      let alpha = /^[A-Za]$/;
      if (val.match(alpha)) this.props.handleChange(event);
      else return;
    }
    this.refs[name].focus();
  };
  render() {
    var header = [];
    header.push(<th key="0">#</th>);
    for (let i = 65; i < 65 + this.props.data[0].length; i++) {
      header.push(
        <th key={String.fromCharCode(i)}>{String.fromCharCode(i)}</th>
      );
    }
    let data = this.props.data.filter(transaction => transaction[0]);
    return (
      <Fragment>
        <Card>
          <Card.Header>
            <h2>
              <span>
                <a
                  className="button"
                  style={{ cursor: "pointer" }}
                  onClick={this.props.handleBack}
                >
                  <i className="fas fa-angle-left mr-3" />
                </a>
              </span>
              Define CSV Columns
            </h2>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Enter column letter of each field below for the CSV being
              uploaded.
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
                    value={
                      this.props.vals["date"] ? this.props.vals["date"] : ""
                    }
                    onChange={this.onChange.bind(this, "input_2")}
                    ref="input_1"
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
                    onChange={this.onChange.bind(this, "input_3")}
                    ref="input_2"
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
                    onChange={this.onChange.bind(this, "input_4")}
                    ref="input_3"
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
                    onChange={this.onChange.bind(this, "input_4")}
                    ref="input_4"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Check
                type="checkbox"
                id="skip"
                name="skip"
                checked={this.props.vals["skip"]}
                onChange={this.props.handleChange}
                label="Skip first row"
              />
              <Button
                variant="primary"
                type="button"
                onClick={this.props.handleSubmit}
                className="mt-3"
                disabled={!this.props.valid}
              >
                Next Step
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <Card className="mt-2">
          <Card.Body>
            <Card.Title>CSV Preview</Card.Title>
            <table className="table">
              <thead>
                <tr>{header}</tr>
              </thead>
              <tbody>
                {data.map((transaction, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {transaction.map((col, index) => {
                        return <td key={index}>{col}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Fragment>
    );
  }
}

export default ColumnDefine;
