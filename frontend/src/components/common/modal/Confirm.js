import React, { Component } from 'react'

export class confirm extends Component {
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
                        <div className="modal-body">{this.props.body}</div>
                        <div className="modal-footer">
                            <div className="form-group ">
                                <input className="form-control" id="id_name" name="active" type="hidden" value="0" />
                            </div>
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <button onClick={() => this.props.handler(this.props.arg)} className={"btn " + this.props.btnClass} type="submit" data-dismiss="modal">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default confirm
