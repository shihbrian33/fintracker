import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Generic from "./Form/Generic";
import TextArea from "./Form/TextArea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from "react-router-dom";
import { getCard, addCard, updateCard } from "../../actions/cards";
import Spinner from "react-bootstrap/Spinner";

export class Form extends Component {
  state = {
    name: "",
    type: "1",
    limit: "",
    date_activated: "",
    date_cancelled: null,
    date_reminder: null,
    active: "1",
    incentive: "",
    notes: "",
    annualfee: "",
    success: 0,
    loaded: 0
  };

  static propTypes = {
    addCard: PropTypes.func.isRequired,
    getCard: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired
  };

  onDateChange = (name, date) => {
    this.setState({
      [name]: date.toISOString().substring(0, 10)
    });
  };

  componentWillReceiveProps(prevProps) {
    let card = Object.assign({}, this.props.card);
    card.loaded = 1;
    console.log(card);
    this.setState(card);
  }

  componentDidMount() {
    if (this.props.update) {
      const {
        match: { params }
      } = this.props;
      this.props.getCard(params.id);
    }
  }

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
    if (this.props.update) {
      this.props.updateCard(card, this.props.card.id).then(res => {
        this.setState({ success: 1 });
      });
    } else {
      this.props.addCard(card).then(res => {
        this.setState({ success: 1 });
      });
    }
  };

  render() {
    var types = {
      1: "Mastercard",
      2: "Visa",
      3: "American Express",
      4: "Other"
    };
    if (this.state.success) return <Redirect to="/cards/" />;
    if (this.props.update && this.state.loaded) {
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
                    value={this.state.name}
                  />
                  <div className="col-6">
                    <div className="form-group ">
                      <label
                        className="control-label requiredField"
                        htmlFor="id_type"
                      >
                        <strong>Card Type</strong>
                      </label>
                      <select
                        className="select form-control"
                        id="id_type"
                        name="type"
                        onChange={this.onChange}
                        value={this.state.type}
                      >
                        {Object.entries(types).map(([key, value]) => {
                          return (
                            <option value={key} key={key}>
                              {value}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <Generic
                    name="Credit Limit"
                    id="limit"
                    required={true}
                    onChange={this.onChange}
                    value={this.state.limit}
                  />
                  <Generic
                    name="Annual Fee"
                    id="annualfee"
                    required={true}
                    onChange={this.onChange}
                    value={this.state.annualfee}
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
                    <label
                      className="control-label"
                      htmlFor="id_date_cancelled"
                    >
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
                    value={this.state.incentive}
                  />
                  <TextArea
                    name="Notes"
                    id="notes"
                    onChange={this.onChange}
                    value={this.state.notes}
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
    } else {
      return (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <Spinner animation="border" role="status" />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  card: state.cards.card
});

export default connect(mapStateToProps, { addCard, getCard, updateCard })(Form);
