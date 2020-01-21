import React, { Component } from "react";

export class Option extends Component {
  render() {
    return (
      <div className="col-6">
        <div className="form-group ">
          <label
            className="control-label requiredField"
            htmlFor={"id_" + this.props.name}
          >
            <strong>{this.props.name}</strong>
            {this.props.required && <span className="asteriskField">*</span>}
          </label>
          <select
            className="select form-control"
            id={"id_" + this.props.name}
            name={this.props.name}
          >
            {Object.entries(this.props.options).map(([key, value]) => {
              return (
                <option value={key} key={key}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}

export default Option;
