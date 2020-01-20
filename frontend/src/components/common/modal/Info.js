import React, { Component } from 'react'

export class Info extends Component {
    render() {
        return (
            <div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog" aria-labelledby={this.props.modalId} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {Object.entries(this.props.values).map(([key, value]) => {
                                return <div key={key}>{key}: {value}</div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Info
