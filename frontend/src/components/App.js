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
import { loadUser } from "../actions/auth";

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
                  <Route exact path="/cards" component={CardsList} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/cards/new" component={Form} />
                  <Route path="/cards/:id" component={CardDetails} />
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
