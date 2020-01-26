import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

export class Sidebar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    if (isAuthenticated) {
      return (
        <ul className="sidebar navbar-nav">
          <li className="nav-item active">
            <Link to="/cards" className="nav-link">
              <i className="fas fa-fw fa-credit-card mr-2"></i>
              <span>Credit Card</span>
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/transactions" className="nav-link">
              <i className="fas fa-wallet mr-2"></i>
              <span>Transactions</span>
            </Link>
          </li>
        </ul>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Sidebar);
