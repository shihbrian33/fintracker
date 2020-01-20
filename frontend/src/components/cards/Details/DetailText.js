import React, { Component } from 'react'

export class DetailText extends Component {
    render() {
        return (
            <div className="col-lg-6">
                <div className="card mb-4 b">
                    <div className="card-header bg-cardDetail">
                        <h6 className="m-0 font-weight-bold text-primary">{this.props.name}</h6>
                    </div>
                    <div className="card-body">
                        {this.props.text}
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailText
