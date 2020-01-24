import React, { Component } from "react";

export class Detail extends Component {
  render() {
    return (
      <div className="col-xl-4 col-md-6 mb-4 mt-4">
        <div className="card border-left-primary shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="font-weight-bold text-primary text-uppercase mb-1">
                  {this.props.name}
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {this.props.value == null && "N/A"}
                  {this.props.value != null && this.props.value}
                </div>
              </div>
              <div className="col-auto">
                <i className={this.props.icon + " fa-3x text-gray-300"}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detail;
