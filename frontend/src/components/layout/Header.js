import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    if (isAuthenticated) {
      return (
        <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
          <a className="navbar-brand mr-1" href="#"></a>
          <button
            className="btn btn-link btn-sm text-white order-1 order-sm-0"
            id="sidebarToggle"
            href="#"
          >
            <i className="fas fa-bars"></i>
          </button>
          <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0"></form>
          <ul className="navbar-nav ml-auto ml-md-0">
            <li className="nav-item dropdown no-arrow">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-user-circle fa-fw"></i>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="userDropdown"
              >
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item"
                  onClick={this.props.logout}
                  data-toggle="modal"
                  data-target="#logoutModal"
                >
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
