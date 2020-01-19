import React, { Component, Fragment } from 'react'
import Cards from './Cards'

export class CardSection extends Component {
    render() {
        return (
            <Fragment>
                <div className="card bg-secondary mb-1">
                    <a className="card-block stretched-link text-decoration-none text-white" data-toggle="collapse" href={this.props.active ? '#ActiveCards' : '#CancelledCards'} aria-expanded="true">
                        <div className="card-header">
                            <strong>{this.props.active ? 'Active Cards' : 'Cancelled Cards'}</strong>
                            <span className="float-right">
                                <i className="fa" aria-hidden="true"></i>
                            </span>
                        </div>
                    </a>
                </div>
                <Cards active={this.props.active} />
            </Fragment>
        )
    }
}

export default CardSection
