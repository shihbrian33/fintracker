import React, { Component, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  deleteTransaction,
  getPrevTransactions,
  addTransaction
} from "../../actions/transaction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function ModalRow({ row }) {
  console.log(row);
  return (
    <tr>
      <td>{row.date}</td>
      <td>${row.amount}</td>
      <td>{row.notes}</td>
    </tr>
  );
}

export class TransactionTable extends Component {
  static propTypes = {
    deleteTransaction: PropTypes.func.isRequired,
    getPrevTransactions: PropTypes.func.isRequired
  };

  state = {
    show: false,
    name: "",
    data: null
  };
  handleClick = (categoryName, data) => {
    this.setState({
      show: true,
      name: categoryName,
      data: data
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
    var totals = {};
    for (var i in this.props.data) {
      let amount = this.props.data[i].amount;
      let name = this.props.data[i].cat_name;
      totals[name] = totals[name] ? totals[name] + amount : amount;
    }
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
            {Object.keys(totals).map((name, index) => (
              <tr
                key={index}
                onClick={this.handleClick.bind(this, name, this.props.data)}
              >
                <td>
                  {name}
                  {/*
                  {transaction.notes && (
                    <span style={{ float: "right" }}>
                      <i className="far fa-sticky-note" />
                    </span>
                  )}
                  */}
                </td>
                <td className="td-right">${totals[name]}</td>
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
            <table className="table" id="modalTable">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {this.props.data
                  .filter(t => t.cat_name == this.state.name)
                  .map((transaction, index) => (
                    <ModalRow row={transaction} key={index} />
                  ))}
              </tbody>
            </table>
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
