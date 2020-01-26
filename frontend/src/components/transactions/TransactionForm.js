import React, { Component } from "react";
import CategorySelect from "./CategorySelect";
import DatePicker from "react-datepicker";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTransaction } from "../../actions/transaction";

export class TransactionForm extends Component {
  static propTypes = {
    addTransaction: PropTypes.func.isRequired
  };

  state = {
    category: 1,
    note: null,
    amount: 0,
    date: null
  };

  onDateChange = (name, date) => {
    this.setState({
      [name]: date.toISOString().substring(0, 10)
    });
  };

  onNumChange = (name, amount) => {
    this.setState({ [name]: amount.target.value.replace(/\D/, "") });
  };

  onSubmit = e => {
    e.preventDefault();
    const { date, amount, category, note } = this.state;
    const transaction = { date, amount, category, note };
    this.props.addTransaction(transaction);
  };

  onChange = (name, e) => {
    this.setState({ [name]: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col-xl-6">
            <CategorySelect
              onChange={this.onChange}
              name="category"
              value={this.props.category}
            />
          </div>
          <div className="col-xl-6">
            <label>Amount</label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fas fa-dollar-sign"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="Amount"
                onChange={this.onNumChange.bind(this, "amount")}
                value={this.state.amount}
              />
            </InputGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label
              className="control-label requiredField"
              htmlFor="id_transaction_date"
            >
              Date
            </label>
            <DatePicker
              className="form-control"
              value={this.state.date}
              todayButton="Today"
              required={true}
              onChange={this.onDateChange.bind(this, "date")}
            />
          </div>
          <div className="col-xl-6">
            <label>Note</label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fas fa-sticky-note"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl onChange={this.onChange.bind(this, "note")} />
            </InputGroup>
          </div>
        </div>
        <div className="form-group mt-3 ">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ float: "right" }}
            onClick={this.props.close}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default connect(null, { addTransaction })(TransactionForm);
