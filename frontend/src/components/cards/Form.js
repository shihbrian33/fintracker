import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCard } from "../../actions/cards";
import Generic from "./Form/Generic";
import Option from "./Form/Option";
import TextArea from "./Form/TextArea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class Form extends Component {
  state = {
    name: "",
    type: "",
    limit: "",
    date_activated: "",
    date_cancelled: "",
    date_reminder: "",
    active: "",
    incentive: "",
    notes: "",
    annualfee: ""
  };

  static propTypes = {
    addCard: PropTypes.func.isRequired
  };

  onDateChange = (name, date) => {
    console.log(name);
    console.log(date);
    this.setState({
      [name]: date.toISOString().substring(0, 10)
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const {
      name,
      type,
      limit,
      date_activated,
      date_cancelled,
      date_reminder,
      active,
      incentive,
      notes,
      annualfee
    } = this.state;
    const card = {
      name,
      type,
      limit,
      date_activated,
      date_cancelled,
      date_reminder,
      active,
      incentive,
      notes,
      annualfee
    };
    console.log(card);
    this.props.addCard(card);
    this.setState({
      name: "",
      type: "",
      limit: "",
      date_activated: "",
      date_cancelled: "",
      date_reminder: "",
      active: "",
      incentive: "",
      notes: "",
      annualfee: ""
    });
  };

  render() {
    var types = {
      1: "Mastercard",
      2: "Visa",
      3: "American Express",
      4: "Other"
    };
    return (
      <Fragment>
        <div className="card-header bg-secondary">
          <h2>Add Card</h2>
        </div>
        <div className="card-body bg-cardDetail">
          <form onSubmit={this.onSubmit}>
            <div className="container-fluid">
              <div className="row">
                <Generic
                  name="Name"
                  id="name"
                  required={true}
                  onChange={this.onChange}
                  value={this.name}
                />
                <Option name="Card Type" id="type" options={types} />
              </div>
              <div className="row">
                <Generic
                  name="Credit Limit"
                  id="limit"
                  required={true}
                  onChange={this.onChange}
                  value={this.limit}
                />
                <Generic
                  name="Annual Fee"
                  id="annualfee"
                  required={true}
                  onChange={this.onChange}
                  value={this.annualfee}
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <label
                    className="control-label requiredField"
                    htmlFor="id_date_activated"
                  >
                    <strong>Activation Date*</strong>
                  </label>
                  <DatePicker
                    className="form-control"
                    onChange={this.onDateChange.bind(this, "date_activated")}
                    value={this.state.date_activated}
                    todayButton="Today"
                    required={true}
                  />
                </div>
                <div className="col-6">
                  <label className="control-label" htmlFor="id_date_cancelled">
                    <strong>Cancellation Date</strong>
                  </label>
                  <DatePicker
                    className="form-control"
                    onChange={this.onDateChange.bind(this, "date_cancelled")}
                    value={this.state.date_cancelled}
                    todayButton="Today"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  <label
                    className="control-label requiredField"
                    htmlFor="id_date_reminder"
                  >
                    <strong>Reminder Date</strong>
                  </label>
                  <DatePicker
                    className="form-control"
                    onChange={this.onDateChange.bind(this, "date_reminder")}
                    value={this.state.date_reminder}
                    todayButton="Today"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <TextArea
                  name="Incentive"
                  id="incentive"
                  onChange={this.onChange}
                  value={this.incentive}
                />
                <TextArea
                  name="Notes"
                  id="notes"
                  onChange={this.onChange}
                  value={this.notes}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { addCard })(Form);
