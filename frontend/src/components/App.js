import React, { Component, Fragment } from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { Provider } from 'react-redux';
import store from '../store';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import CardSection from './cards/CardSection';

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
                                <CardSection active={true} />
                                <CardSection active={false} />
                            </div>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

ReactDom.render(<App />, document.getElementById('app'));
