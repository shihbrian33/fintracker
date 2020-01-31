import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  deleteTransaction,
  getPrevTransactions,
  addTransaction
} from "../../actions/transaction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class TransactionTable extends Component {
  static propTypes = {
    deleteTransaction: PropTypes.func.isRequired,
    getPrevTransactions: PropTypes.func.isRequired
  };

  state = {
    show: false,
    name: "",
    amount: "",
    note: "",
    date: null
  };
  handleClick = transaction => {
    this.setState({
      show: true,
      name: transaction.cat_name,
      amount: transaction.amount,
      note: transaction.notes,
      date: transaction.date,
      id: transaction.id
    });
  };

  handleClose() {
    this.setState({ show: false });
  }

  handleDelete(id) {
    this.setState({ show: false });
    this.props.deleteTransaction(id);
  }

  handleCopy = type => {
    var types = {
      Income: 1,
      "Recurring Bills": 2,
      Expenses: 3
    };
    var args = {
      month: this.props.copyMonth,
      year: this.props.copyYear,
      type: types[type]
    };
    this.props.getPrevTransactions(args).then(res => {
      var results = [];
      for (var i in res.data) {
        let trans = res.data[i];
        let copy = {
          amount: trans.amount,
          notes: trans.notes,
          category: trans.category,
          date: this.props.currYear + "-" + this.props.currMonth + "-01"
        };
        results.push(copy);
      }
      this.props.addTransaction(results);
    });
  };
  render() {
    return (
      <div className="col-xl-6">
        <table className="table" id="transaction">
          <thead>
            <tr>
              <th colSpan="2">
                {this.props.tablename}
                {this.props.prev && (
                  <a
                    className="button"
                    onClick={this.handleCopy.bind(this, this.props.tablename)}
                  >
                    <i className="far fa-copy float-right" />
                  </a>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.map(transaction => (
              <tr
                key={transaction.id}
                onClick={this.handleClick.bind(this, transaction)}
              >
                <td>
                  {transaction.cat_name}
                  {transaction.notes && (
                    <span style={{ float: "right" }}>
                      <i className="far fa-sticky-note" />
                    </span>
                  )}
                </td>
                <td className="td-right">${transaction.amount}</td>
              </tr>
            ))}
            <tr>
              <td>Total</td>
              <td className="td-right">
                <strong>${this.props.total}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <Modal
          show={this.state.show}
          onHide={this.handleClose.bind(this)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>{this.state.name}</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>${this.state.amount}</h3>
            <div>Note: {this.state.note}</div>
            <small className="text-muted">{this.state.date}</small>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={this.handleDelete.bind(this, this.state.id)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default connect(null, {
  deleteTransaction,
  getPrevTransactions,
  addTransaction
})(TransactionTable);
