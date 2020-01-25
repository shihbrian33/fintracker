import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import CardsList from "./cards/CardsList";
import CardDetails from "./cards/Details/Details";
import Profile from "./Users/Profile";
import Form from "./cards/Form";
import Login from "./Users/Login";
import Register from "./Users/Register";
import RegConfirm from "./Users/RegConfirm";
import { loadUser } from "../actions/auth";
import PrivateRoute from "./common/PrivateRoute";

const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Header />
            <div id="wrapper">
              <Sidebar />
              <div id="content-wrapper" className="mr-3 ml-3">
                <Switch>
                  <PrivateRoute exact path="/cards" component={CardsList} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/profile" component={Profile} />
                  <Route
                    exact
                    path="/registration-confirmation"
                    component={RegConfirm}
                  />
                  <PrivateRoute
                    exact
                    path="/cards/new"
                    component={Form}
                    update={false}
                  />
                  <Route
                    exact
                    path="/cards/:id/update"
                    render={props => <Form {...props} update={true} />}
                  />
                  <PrivateRoute path="/cards/:id" component={CardDetails} />
                </Switch>
              </div>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
