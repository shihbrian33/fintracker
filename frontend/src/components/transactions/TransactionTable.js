import React, { Component, Fragment } from "react";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

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
        let date = new Date(trans.date);
        let newDate = new Date(date.setMonth(date.getMonth() + 1));
        let copy = {
          amount: trans.amount,
          notes: trans.notes,
          category: trans.category,
          date: newDate.toISOString().substring(0, 10)
        };
        results.push(copy);
      }
      this.props.addTransaction(results);
    });
  };
  render() {
    var totals = {};
    var notes = {};
    for (var i in this.props.data) {
      let amount = this.props.data[i].amount;
      let name = this.props.data[i].cat_name;
      totals[name] = totals[name]
        ? Number(totals[name]) + Number(amount)
        : Number(amount);
      if (this.props.data[i].notes) {
        notes[name] = 1;
      }
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
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 100, hide: 400 }}
                      overlay={
                        <Tooltip id="tooltip-top">
                          Copy from previous month
                        </Tooltip>
                      }
                    >
                      <i className="far fa-copy float-right" />
                    </OverlayTrigger>
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
                  {notes[name] && (
                    <span style={{ float: "right" }}>
                      <i className="far fa-sticky-note" />
                    </span>
                  )}
                </td>
                <td className="td-right">${totals[name].toFixed(2)}</td>
              </tr>
            ))}
            <tr>
              <td>Total</td>
              <td className="td-right">
                <strong>${this.props.total.toFixed(2)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
        <Modal
          show={this.state.show}
          onHide={this.handleClose.bind(this)}
          size="xl"
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
                  <th>Card</th>
                  <th>Merchant</th>
                  <th>Amount</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {this.props.data
                  .filter(t => t.cat_name == this.state.name)
                  .map((transaction, index) => (
                    <tr key={index}>
                      <td style={{ width: "10%" }}>{transaction.date}</td>
                      <td>{transaction.card}</td>
                      <td>{transaction.merchant}</td>
                      <td style={{ width: "10%" }}>${transaction.amount}</td>
                      <td>
                        {transaction.notes}
                        <a
                          className="button"
                          style={{ float: "right", cursor: "pointer" }}
                          onClick={this.handleDelete.bind(this, transaction.id)}
                        >
                          <i className="far fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Modal.Body>
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
