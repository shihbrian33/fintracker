import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    error: {},
    sent: 0
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    user: PropTypes.object
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      let error = { password: "Passwords do not match" };
      this.setState({ error: error, password: "", password2: "" });
    } else {
      const newUser = {
        email,
        username,
        password
      };
      this.props
        .register(newUser)
        .then(() => {
          this.setState({ sent: 1 });
        })
        .catch(err => {
          let error = {};
          Object.keys(err.response.data).map(key => {
            error[key] = err.response.data[key];
          });
          this.setState({ error: error });
        });
    }
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  render() {
    if (this.state.sent) {
      return <Redirect to="/registration-confirmation" />;
    }
    const { username, email, password, password2 } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className={
                  "form-control " +
                  (this.state.error["username"] ? "is-invalid" : "")
                }
                name="username"
                onChange={this.onChange}
                value={username}
              />
              {this.state.error["username"] && (
                <div className="invalid-feedback">
                  {this.state.error["username"]}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className={
                  "form-control " +
                  (this.state.error["email"] ? "is-invalid" : "")
                }
                name="email"
                onChange={this.onChange}
                value={email}
              />
              {this.state.error["email"] && (
                <div className="invalid-feedback">
                  {this.state.error["email"]}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className={
                  "form-control " +
                  (this.state.error["password"] ? "is-invalid" : "")
                }
                name="password"
                onChange={this.onChange}
                value={password}
              />
              {this.state.error["password"] && (
                <div className="invalid-feedback">
                  {this.state.error["password"]}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { register, createMessage })(Register);
