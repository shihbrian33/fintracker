import React, { Component } from "react";
import { Link } from "react-router-dom";

function IconClass(type) {
  switch (type) {
    case 1:
      return "fab fa-cc-mastercard";
    case 2:
      return "fab fa-cc-visa";
    case 3:
      return "fab fa-cc-amex";
    case 4:
      return "fas fa-credit-card";
    default:
      return null;
  }
}

export class Cards extends Component {
  render() {
    return (
      <div
        className="collapse show"
        id={this.props.active ? "ActiveCards" : "CancelledCards"}
      >
        <div className="row">
          {this.props.cards
            .filter(card => {
              if (this.props.active) return !card.date_cancelled;
              else return card.date_cancelled;
            })
            .map(card => (
              <div className="col-xl-3 col-sm-6 my-3" key={card.id}>
                <div
                  className={
                    "card text-white o-hidden vh-15 " +
                    (this.props.active ? "bg-active" : "bg-inactive")
                  }
                >
                  <Link
                    to={`/cards/${card.id}`}
                    className="card-body stretched-link text-decoration-none text-white"
                  >
                    <div className="card-body-icon">
                      <i className={IconClass(card.type)}> </i>
                    </div>
                    <div className="mr-5">
                      <h5>{card.name}</h5>
                    </div>
                  </Link>
                  <Link
                    to={`/cards/${card.id}`}
                    className="card-footer stretched-link text-white clearfix small z-1"
                    style={{ textDecoration: "none" }}
                  >
                    View Details
                    <span className="float-right">
                      <i className="fas fa-angle-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          {this.props.active == true && (
            <div className="col-xl-3 col-sm-6 my-3">
              <div className="card text-white bg-newcard o-hidden vh-15">
                <a
                  className="card-body stretched-link text-decoration-none text-white"
                  href="/#/cards/new"
                >
                  <div className="card-body-icon unrotate">
                    <i className="fas fa-fw fa-plus"> </i>
                  </div>
                  <div className="mr-5">
                    <h4>Add a New Card</h4>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.cards.cards
});

export default Cards;
