import React, { Component } from "react";
import CategorySelect from "../category/CategorySelect";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTransaction } from "../../actions/transaction";
import { getCards } from "../../actions/cards";
import DatePicker from "react-datepicker";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

export class TransactionForm extends Component {
  constructor(props) {
    super(props);
    var date = new Date();
    this.state = {
      category: 0,
      notes: null,
      amount: 0,
      date: date,
      merchant: null,
      card: "",
      valid: false,
      curMonth: null
    };
  }

  static propTypes = {
    addTransaction: PropTypes.func.isRequired,
    getCards: PropTypes.func.isRequired
  };

  onDateChange = (name, date) => {
    this.setState({
      [name]: date.toISOString().substring(0, 10)
    });
  };

  onNumChange = (name, amount) => {
    let val = amount.target.value;
    const regex = /^\d+[.]{0,1}\d{0,2}$/;
    if (val.match(regex)) {
      this.setState({ [name]: val });
    }
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
    var args = {
      active: 1
    };
    var date = new Date(this.props.year, this.props.month);
    this.setState({ curMonth: date });
    this.props.getCards(args);
  }

  render() {
    var date;
    if (this.state.curMonth) {
      let pageMonth = this.state.curMonth.getMonth();
      let curMonth = this.state.date.getMonth();
      if (pageMonth == curMonth) {
        date = this.state.date;
      } else {
        date = this.state.curMonth;
      }
    } else {
      date = this.state.date;
    }
    date = date.toISOString().substring(0, 10);
    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col-xl-6">
            <CategorySelect
              onChange={this.onChange.bind(this, "category")}
              name="category"
              value={this.state.category}
              header={true}
              income={true}
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
              value={date}
              required={true}
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
                  <select
                    value={this.state.card}
                    className="select form-control"
                    onChange={this.onChange.bind(this, "card")}
                  >
                    <option
                      value=""
                      disabled
                      style={{ display: "none" }}
                    ></option>
                    {this.props.cards.map(card => {
                      return (
                        <option value={card.name} key={card.id}>
                          {card.name}
                        </option>
                      );
                    })}
                  </select>
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
            disabled={!(this.state.amount && this.state.category)}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.cards.cards
});

export default connect(mapStateToProps, { addTransaction, getCards })(
  TransactionForm
);
