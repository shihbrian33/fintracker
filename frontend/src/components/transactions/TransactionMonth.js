import React, { Component, Fragment, useState } from "react";
import TransactionTable from "./TransactionTable";
import TransactionForm from "./TransactionForm";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTransactions } from "../../actions/transaction";

function ShowModal(test) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    setShow(false);
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Transaction
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionForm close={handleSubmit} />
        </Modal.Body>
      </Modal>
    </>
  );
}

function get_total(arr) {
  let total = 0;
  arr.forEach(item => {
    total += item.amount;
  });
  return total;
}

function arrfilter(type, data) {
  return data.filter(transaction => transaction.cat_type === type);
}
export class TransactionMonth extends Component {
  static propTypes = {
    transactions: PropTypes.array.isRequired,
    getTransactions: PropTypes.func.isRequired
  };

  state = {
    loaded: 0,
    page: 0,
    transactions: null
  };

  componentDidMount() {
    this.props.getTransactions();
  }

  componentWillReceiveProps() {
    this.setState({ loaded: 1 });
  }

  render() {
    console.log("render");
    console.log(this.props.transactions);
    var income = arrfilter(1, this.props.transactions);
    var recurring = arrfilter(2, this.props.transactions);
    var expenses = arrfilter(3, this.props.transactions);
    var totals = {
      Income: get_total(income),
      "Recurring Bills": get_total(recurring) * -1,
      Expenses: get_total(expenses) * -1
    };
    var total = 0;
    for (var key in totals) {
      total += totals[key];
    }

    var totclass = total > 0 ? "pos-amount" : "neg-amount";
    if (this.state.loaded) {
      return (
        <Fragment>
          <h2 className="m-0 font-weight-bold text-center mb-3">
            <a href="#" className="text-decoration-none mr-3">
              <i className="fas fa-angle-left" />
            </a>
            January 2020
            <a href="#" className="text-decoration-none ml-3">
              <i className="fas fa-angle-right" />
            </a>
            <span style={{ float: "right" }}>
              <ShowModal />
            </span>
          </h2>
          <div className="row mx-2 my-1">
            <TransactionTable
              tablename="Income"
              data={income}
              total={totals["Income"]}
            />
            <div className="col-xl-6">
              <table className="table" id="transaction">
                <thead>
                  <tr>
                    <th colSpan="2">Summary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Income</td>
                    <td className="td-right pos-amount">
                      +${get_total(income)}
                    </td>
                  </tr>
                  <tr>
                    <td>Recurring Bills</td>
                    <td className="td-right neg-amount">
                      -${get_total(recurring)}
                    </td>
                  </tr>
                  <tr>
                    <td>Expenses</td>
                    <td className="td-right neg-amount">
                      -${get_total(expenses)}
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className={"td-right " + totclass}>${total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row mx-2 my-1">
            <TransactionTable
              tablename="Recurring Bills"
              data={recurring}
              total={totals["Recurring Bills"] * -1}
            />
          </div>
          <div className="row mx-2 my-1">
            <TransactionTable
              tablename="Expenses"
              data={expenses}
              total={totals["Expenses"] * -1}
            />
          </div>
        </Fragment>
      );
    } else return null;
  }
}

const mapStateToProps = state => ({
  transactions: state.transaction.transactions
});

export default connect(mapStateToProps, { getTransactions })(TransactionMonth);
