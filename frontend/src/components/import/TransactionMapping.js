import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CategorySelect from "../category/CategorySelect";
import { addTransaction } from "../../actions/transaction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class TransactionMapping extends Component {
  state = {
    dateCol: -1,
    amountCol: -1,
    merchantCol: -1,
    categoryCol: -1,
    transactions: []
  };

  static propTypes = {
    addTransaction: PropTypes.func.isRequired
  };

  componentDidMount() {
    let dateCol = this.props.cols["date"]
      ? this.props.cols["date"].charCodeAt(0) - 65
      : -1;
    let amountCol = this.props.cols["amount"]
      ? this.props.cols["amount"].charCodeAt(0) - 65
      : -1;
    let merchantCol = this.props.cols["merchant"]
      ? this.props.cols["merchant"].charCodeAt(0) - 65
      : -1;
    let categoryCol = this.props.cols["category"]
      ? this.props.cols["category"].charCodeAt(0) - 65
      : -1;
    var transactions = [];
    this.props.data
      .filter(transaction => transaction[dateCol] && transaction[amountCol] > 0)
      .map(trans => {
        let transaction = {};
        transaction["date"] = trans[dateCol];
        transaction["amount"] = trans[amountCol];
        transaction["merchant"] = merchantCol ? trans[merchantCol] : "";
        if (categoryCol) {
          let catname = trans[categoryCol];
          transaction["category"] = this.props.catmap[catname];
        }
        transactions.push(transaction);
      });
    this.setState({
      dateCol: dateCol,
      amountCol: amountCol,
      merchantCol: merchantCol,
      categoryCol: categoryCol,
      transactions: transactions
    });
  }

  onChange = (index, e) => {
    let transactions = this.state.transactions;
    transactions[index].category = e.target.value;
    this.setState({ transactions: transactions });
  };

  handleSubmit() {
    this.props.handleSummary(this.state.transactions);
    this.props.addTransaction(this.state.transactions);
  }

  render() {
    let valid = true;
    for (let i = 0; i < this.state.transactions.length; i++) {
      let transaction = this.state.transactions[i];
      if (!transaction.category || transaction.category == 0) {
        valid = false;
        break;
      }
    }
    return (
      <Card>
        <Card.Header>
          <h2>Transaction Category</h2>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            Select a category for each transaction imported from the CSV file.
          </Card.Title>
        </Card.Body>
        <Card.Body>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                {this.state.merchantCol && <th>Merchant</th>}
                <th>Amount</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {this.state.transactions.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td>{transaction.date}</td>
                    {this.state.merchantCol && <td>{transaction.merchant}</td>}
                    <td>{transaction.amount}</td>
                    <td>
                      <CategorySelect
                        onChange={this.onChange.bind(this, index)}
                        value={transaction.category ? transaction.category : 0}
                        header={false}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Button
            variant="primary"
            type="button"
            onClick={this.handleSubmit.bind(this)}
            disabled={!valid}
          >
            Next Step
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default connect(null, { addTransaction })(TransactionMapping);
