import React, { Component, Fragment } from "react";
import CardSection from "./CardSection";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCards } from "../../actions/cards";

export class CardsList extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    getCards: PropTypes.func.isRequired
  };

  state = {
    loaded: 0
  };

  componentDidMount() {
    this.props.getCards();
  }

  componentWillReceiveProps() {
    this.setState({ loaded: 1 });
  }

  render() {
    if (this.state.loaded) {
      return (
        <Fragment>
          <CardSection active={true} cards={this.props.cards} />
          <CardSection active={false} cards={this.props.cards} />
        </Fragment>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  cards: state.cards.cards
});

export default connect(mapStateToProps, { getCards })(CardsList);
