import React, { Component } from "react";
import CategorySelect from "./CategorySelect";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTransaction, getCategories } from "../../actions/transaction";
import DatePicker from "react-datepicker";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

export class TransactionForm extends Component {
  constructor(props) {
    super(props);
    var date = new Date();
    date = date.toISOString().substring(0, 10);
    console.log(date);
    this.state = {
      category: 1,
      notes: null,
      amount: 0,
      date: date,
      merchant: null,
      card: null
    };
  }

  static propTypes = {
    addTransaction: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired
  };

  onDateChange = (name, date) => {
    console.log(date);
    this.setState({
      [name]: date.toISOString().substring(0, 10)
    });
  };

  onNumChange = (name, amount) => {
    this.setState({ [name]: amount.target.value.replace(/\D/, "") });
  };

  onSubmit = e => {
    e.preventDefault();
    const { date, amount, category, notes, merchant, card } = this.state;
    const transaction = { date, amount, category, notes, merchant, card };
    this.props.addTransaction(transaction);
  };

  onChange = (name, e) => {
    this.setState({ [name]: e.target.value });
  };

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    console.log(this.state.date);
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
                required
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
              todayButton="Today"
              value={this.state.date}
              required={true}
              maxDate={new Date()}
              showYearDropdown
              dateFormatCalendar="MMMM"
              yearDropdownItemNumber={15}
              scrollableYearDropdown
              showMonthDropdown
              onChange={this.onDateChange.bind(this, "date")}
            />
          </div>
        </div>
        <Accordion className="mt-2">
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Additional Info
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <div>
              <div className="row">
                <div className="col-xl-6">
                  <label>Merchant</label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <i className="fas fa-store-alt"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      onChange={this.onChange.bind(this, "merchant")}
                      maxLength="50"
                    />
                  </InputGroup>
                </div>
                <div className="col-xl-6">
                  <label>Card</label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <i className="far fa-credit-card"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      onChange={this.onChange.bind(this, "card")}
                      maxLength="50"
                    />
                  </InputGroup>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-xl-6">
                  <label>Note</label>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <i className="fas fa-sticky-note"></i>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      onChange={this.onChange.bind(this, "notes")}
                      maxLength="50"
                    />
                  </InputGroup>
                  <small className="text-muted">Max. 50 characters</small>
                </div>
              </div>
            </div>
          </Accordion.Collapse>
        </Accordion>
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
