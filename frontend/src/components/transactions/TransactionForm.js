import React, { Component } from "react";
import CategorySelect from "./CategorySelect";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTransaction, getCategories } from "../../actions/transaction";

export class TransactionForm extends Component {
  static propTypes = {
    addTransaction: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired
  };

  state = {
    category: 1,
    notes: null,
    amount: 0
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
    const { amount, category, notes } = this.state;
    var date = new Date(this.props.year, this.props.month, 1)
      .toISOString()
      .slice(0, 10);
    const transaction = { date, amount, category, notes };
    this.props.addTransaction(transaction);
  };

  onChange = (name, e) => {
    this.setState({ [name]: e.target.value });
  };

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col-xl-6">
            <CategorySelect
              onChange={this.onChange}
              name="category"
              value={this.props.category}
              categories={this.props.categories}
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
          <div className="col-xl-6">
            <label>Note</label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fas fa-sticky-note"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl onChange={this.onChange.bind(this, "notes")} />
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

const mapStateToProps = state => ({
  categories: state.transaction.categories
});

export default connect(mapStateToProps, { addTransaction, getCategories })(
  TransactionForm
);
