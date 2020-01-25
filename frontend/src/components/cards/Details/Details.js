import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import DetailHeader from "./DetailHeader";
import Detail from "./Detail";
import DetailText from "./DetailText";
import PropTypes from "prop-types";
import { getCard, deleteCard, updateCard } from "../../../actions/cards";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

export class CardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      referrer: null,
      loaded: 0
    };
  }

  static propTypes = {
    card: PropTypes.object.isRequired,
    getCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired
  };

  componentWillReceiveProps(prevProps) {
    this.setState({ loaded: 1 });
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.props.getCard(params.id);
  }

  handleDelete = id => {
    const { deleteCard } = this.props;
    deleteCard(id);
    this.setState({ referrer: "/cards" });
  };

  handleCancel = id => {
    const { updateCard } = this.props;
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var card = {
      date_cancelled: date,
      active: 0
    };
    updateCard(card, id);
    this.setState({ referrer: "/cards" });
  };

  render() {
    const { referrer } = this.state;
    if (referrer) return <Redirect to={referrer} />;
    let type = "";
    switch (this.props.card.type) {
      case 1:
        type = "Mastercard";
        break;
      case 2:
        type = "Visa";
        break;
      case 3:
        type = "American Express";
        break;
      default:
        type = "Other";
    }
    if (this.state.loaded) {
      return (
        <Fragment>
          <DetailHeader
            card={this.props.card}
            deleteHandler={this.handleDelete}
            cancelHandler={this.handleCancel}
          />
          <div className="row">
            <Detail
              name="Credit Limit"
              value={`$${this.props.card.limit}`}
              icon="fas fa-user-lock"
            />
            <Detail
              name="Annual Fee"
              value={`$${this.props.card.annualfee}`}
              icon="fas fa-dollar-sign"
            />
            <Detail
              name="Card Type"
              value={type}
              icon="fas far fa-credit-card"
            />
          </div>
          <div className="row">
            <Detail
              name="Activation Date"
              value={this.props.card.date_activated}
              icon="fas fa-calendar-check"
            />
            {this.props.card.date_cancelled && (
              <Detail
                name="Cancellation Date"
                value={this.props.card.date_cancelled}
                icon="fas fa-calendar-times"
              />
            )}
            {!this.props.card.date_cancelled && (
              <Detail
                name="Reminder Date"
                value={this.props.card.date_reminder}
                icon="fas fa-calendar-plus"
              />
            )}
          </div>
          <div className="row">
            <DetailText name="Incentive" text={this.props.card.incentive} />
            <DetailText name="Notes" text={this.props.card.notes} />
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

export default connect(mapStateToProps, { getCard, deleteCard, updateCard })(
  CardDetails
);
