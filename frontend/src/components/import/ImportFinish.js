import React, { Component } from "react";
import Card from "react-bootstrap/Card";

export class ImportFinish extends Component {
  state = {
    total: 0,
    catTotal: {}
  };

  componentDidMount() {
    let total = 0;
    this.props.transactions.map(transaction => {
      total = total + Number(transaction.amount);
    });
    this.setState({ total: total });
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <h2>Import Complete</h2>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            Successfully imported {this.props.transactions.length} transactions
            totalling to ${this.state.total}
          </Card.Title>
        </Card.Body>
      </Card>
    );
  }
}

export default ImportFinish;
