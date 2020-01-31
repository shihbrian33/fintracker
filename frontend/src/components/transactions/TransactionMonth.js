import React, { Component, Fragment, useState } from "react";
import TransactionTable from "./TransactionTable";
import TransactionForm from "./TransactionForm";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTransactions } from "../../actions/transaction";
import { Link } from "react-router-dom";

function ShowModal(date) {
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
          <TransactionForm
            close={handleSubmit}
            month={date.month}
            year={date.year}
          />
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
  constructor(props) {
    super(props);
    var date = new Date();
    this.state = {
      loaded: 0,
      month: date.getMonth() + 1,
      year: date.getYear() + 1900
    };
  }

  static propTypes = {
    transactions: PropTypes.array.isRequired,
    getTransactions: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    var args = {
      month: params.month,
      year: params.year
    };
    this.props.getTransactions(args);
    this.setState({ month: params.month, year: params.year });
  }

  componentWillReceiveProps() {
    this.setState({ loaded: 1 });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.month !== this.props.match.params.month) {
      var args = {
        month: this.props.match.params.month,
        year: this.props.match.params.year
      };

      this.props.getTransactions(args);
      this.setState({
        month: this.props.match.params.month,
        year: this.props.match.params.year
      });
    }
  }

  render() {
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
      let prevMonth = parseInt(this.state.month, 10) - 1;
      let prevYear = parseInt(this.state.year, 10);
      let nextMonth = parseInt(this.state.month, 10) + 1;
      let nextYear = parseInt(this.state.year, 10);
      if (this.state.month == 12) {
        nextMonth = 1;
        nextYear = parseInt(this.state.year, 10) + 1;
      } else if (this.state.month == 1) {
        prevMonth = 12;
        prevYear = parseInt(this.state.year, 10) - 1;
      }
      const date = new Date(this.state.year, this.state.month - 1, 1);
      const cur_month = date.toLocaleDateString("default", { month: "long" });
      return (
        <Fragment>
          <h2 className="m-0 font-weight-bold text-center mb-3">
            <Link to={`/transactions/${prevYear}/${prevMonth}`}>
              <i className="fas fa-angle-left mr-3" />
            </Link>
            {cur_month + " " + this.state.year}
            <Link to={`/transactions/${nextYear}/${nextMonth}`}>
              <i className="fas fa-angle-right ml-3" />
            </Link>
            <span style={{ float: "right" }}>
              <ShowModal month={this.state.month - 1} year={this.state.year} />
            </span>
          </h2>
          <div className="row mx-2 my-1">
            <TransactionTable
              tablename="Income"
              data={income}
              total={totals["Income"]}
              prev={true}
              copyYear={prevYear}
              copyMonth={prevMonth}
              currYear={this.state.year}
              currMonth={this.state.month}
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
                    <td className={"td-right " + totclass}>
                      <strong>${total}</strong>
                    </td>
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
              prev={true}
              copyYear={prevYear}
              copyMonth={prevMonth}
              currYear={this.state.year}
              currMonth={this.state.month}
            />
          </div>
          <div className="row mx-2 my-1">
            <TransactionTable
              tablename="Expenses"
              data={expenses}
              total={totals["Expenses"] * -1}
              prev={false}
            />
          </div>
        </Fragment>
      );
    } else return null;
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transaction.transactions
  };
};

export default connect(mapStateToProps, { getTransactions })(TransactionMonth);
