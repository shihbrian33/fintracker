import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { Provider } from 'react-redux';
import store from '../store';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import CardsList from './cards/CardsList';
import CardDetails from './cards/Details/Details';
import Profile from './Users/Profile';

class App extends Component {

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
                                    <Route exact path='/cards' component={CardsList} />
                                    <Route exact path='/profile' component={Profile} />
                                    <Route path='/cards/:id' component={CardDetails} />
                                </Switch>
                            </div>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'));
