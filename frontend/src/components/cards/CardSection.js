import React, { Component, Fragment } from "react";
import Card from "./Card";

export class CardSection extends Component {
  render() {
    return (
      <Fragment>
        <div className="card bg-secondary">
          <a
            className="card-block stretched-link text-decoration-none text-white"
            data-toggle="collapse"
            href={this.props.active ? "#ActiveCards" : "#CancelledCards"}
            aria-expanded="true"
          >
            <div className="card-header">
              <strong>
                {this.props.active ? "Active Cards" : "Cancelled Cards"}
              </strong>
              <span className="float-right">
                <i className="fa" aria-hidden="true"></i>
              </span>
            </div>
          </a>
        </div>
        <div className="card-body">
          <Card active={this.props.active} cards={this.props.cards} />
        </div>
      </Fragment>
    );
  }
}

export default CardSection;
