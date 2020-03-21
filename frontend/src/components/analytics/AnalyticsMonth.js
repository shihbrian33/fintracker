import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTransactions } from "../../actions/transaction";
import TransactionPieChart, {
  TransactionChart
} from "../charts/TransactionPieChart";

function get_total(arr, category) {
  let total = 0;
  arr.forEach(item => {
    if (category) {
      if (item.cat_type == category) total += Number(item.amount);
    } else {
      total += Number(item.amount);
    }
  });
  return total;
}

export class AnalyticsMonth extends Component {
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
    var args = {};
    if (!params.month || !params.year) {
      args = {
        month: this.state.month,
        year: this.state.year
      };
    } else {
      args = {
        month: params.month,
        year: params.year
      };
      this.setState({ month: params.month, year: params.year });
    }
    this.props.getTransactions(args);
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
    if (this.state.loaded) {
      var income = this.props.transactions.filter(
        transaction => transaction.cat_type === 1
      );
      var totexpenses = this.props.transactions.filter(
        transaction => transaction.cat_type === 2 || transaction.cat_type == 3
      );
      var recurring = this.props.transactions.filter(
        transaction => transaction.cat_type === 2
      );
      var expenses = this.props.transactions.filter(
        transaction => transaction.cat_type == 3
      );
      var totals = {
        Income: get_total(income),
        TotExpenses: get_total(totexpenses),
        Expenses: get_total(recurring),
        Recurring: get_total(expenses),
        Total: get_total(income) - get_total(totexpenses)
      };

      var summary = [
        {
          cat_name: "Net Income",
          amount: totals["Total"]
        },
        {
          cat_name: "Expenses",
          amount: totals["Expenses"]
        },
        {
          cat_name: "Recurring",
          amount: totals["Recurring"]
        }
      ];
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
            <Link to={`/transactions/${this.state.year}/${this.state.month}`}>
              <span style={{ float: "left" }}>
                <Button variant="info">Show Transactions</Button>
              </span>
            </Link>
            <Link to={`/analytics/${prevYear}/${prevMonth}`}>
              <span>
                <i className="fas fa-angle-left mr-3" />
              </span>
            </Link>
            <span className="noselect">
              {cur_month + " " + this.state.year}
            </span>
            <Link to={`/analytics/${nextYear}/${nextMonth}`}>
              <span>
                <i className="fas fa-angle-right ml-3" />
              </span>
            </Link>
          </h2>
          <div className="row mx-2 my-1">
            <div className="col-xl-6">
              <TransactionPieChart data={summary} name="Summary" />
            </div>
            <div className="col-xl-6">
              <TransactionPieChart data={totexpenses} name="Total Expenses" />
            </div>
          </div>
          <div className="row mx-2 my-1">
            <div className="col-xl-6">
              <TransactionPieChart data={recurring} name="Recurring" />
            </div>
            <div className="col-xl-6">
              <TransactionPieChart data={expenses} name="Expenses" />
            </div>
          </div>
        </Fragment>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transaction.transactions
  };
};

export default connect(mapStateToProps, { getTransactions })(AnalyticsMonth);
