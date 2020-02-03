import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

export class RegConfirm extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 4000);
  }

  componentWillUnmount() {
    clearTimeout(this.id);
  }

  render() {
    if (
      !this.state.redirect &&
      this.props.auth.user &&
      this.props.auth.confirmation_sent
    ) {
      return (
        <div className="container">
          <div className="card mx-auto mt-5">
            <div className="card-body">
              <div className="text-center mb-4">
                <h4>Thank You for Registering! </h4>
                <h5>Please Check Your Email for Account Verification Link </h5>
                <p>You will be automatically redirected to the login page</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(RegConfirm);
