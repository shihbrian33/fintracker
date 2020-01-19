import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Sidebar extends Component {
    render() {
        return (
            <ul className="sidebar navbar-nav">
                <li className="nav-item active">
                    <Link to="/cards" className="nav-link">
                        <i className="fas fa-fw fa-credit-card mr-1"></i>
                        <span>Credit Card</span>
                    </Link>
                </li>
            </ul>
        )
    }
}

export default Sidebar
