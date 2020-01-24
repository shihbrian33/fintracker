import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { logout } from "../../actions/auth";
import Confirm from "../common/modal/Confirm";

export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  logoutHandler = e => {
    this.props.logout();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    if (isAuthenticated) {
      return (
        <Fragment>
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
                    data-toggle="modal"
                    data-target="#logoutModal"
                  >
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </nav>
          <Confirm
            modalId="logoutModal"
            title="Ready to Logout?"
            body="Confirm below if you are ready to end your current session."
            btnClass="btn-info"
            handler={this.logoutHandler}
            args=""
          />
        </Fragment>
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
