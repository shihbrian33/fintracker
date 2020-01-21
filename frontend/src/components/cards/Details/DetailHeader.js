import React, { Component, Fragment } from 'react'
import Confirm from '../../common/modal/Confirm';
import Info from '../../common/modal/Info';

function convertISO(datetime) {
    var date = new Date(datetime).toLocaleString();
    return date;
}

export class DetailHeader extends Component {
    render() {
        var history = {
            "Date Created": convertISO(this.props.card.date_posted),
            "Last Update": convertISO(this.props.card.date_updated)
        }
        return (
            < Fragment >
                <div className="card">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h2 className="m-0 font-weight-bold">{this.props.card.name}</h2>
                        <div className="dropdown no-arrow">
                            <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                <div className="dropdown-header">Actions</div>
                                <a className="dropdown-item">Update</a>
                                <a className="dropdown-item" data-toggle="modal" data-target="#InfoModal">History</a>
                                <a className="dropdown-item" data-toggle="modal" data-target="#CancelModal">Mark as cancelled</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item dropdown-danger" href="#" data-toggle="modal" data-target="#DeleteModal">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
                <Confirm modalId='CancelModal' title='Cancel Card?' body='Are you sure you want mark this credit card as cancelled?' btnClass='btn-info' />
                <Confirm modalId='DeleteModal' title='Delete Card?' body='Are you sure you want to delete this credit card?' btnClass='btn-danger' handler={this.props.deleteHandler} arg={this.props.card.id} />
                <Info modalId='InfoModal' title='Card History' values={history} />
            </Fragment >
        )
    }
}

export default DetailHeader
