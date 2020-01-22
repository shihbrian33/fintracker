import React, { Component } from "react";

export class Generic extends Component {
  render() {
    return (
      <div className="col-6">
        <div className="form-group">
          <label
            className="control-label requiredField"
            htmlFor={"id_" + this.props.name}
          >
            <strong>{this.props.name}</strong>
            {this.props.required && <span className="asteriskField">*</span>}
          </label>
          <input
            className="form-control"
            id={"id_" + this.props.id}
            name={this.props.id}
            placeholder=""
            type=" text"
            onChange={this.props.onChange}
            value={this.props.value}
          />
        </div>
      </div>
    );
  }
}

export default Generic;
