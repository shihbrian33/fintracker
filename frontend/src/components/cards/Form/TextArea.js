import React, { Component } from "react";

export class TextArea extends Component {
  render() {
    return (
      <div className="col-6">
        <div className="form-group ">
          <label className="control-label " htmlFor={"id_" + this.props.name}>
            <strong>{this.props.name}</strong>
          </label>
          <textarea
            cols="40"
            placeholder={this.props.placeholder}
            rows="10"
            className="form-control"
            id={"id_" + this.props.id}
            name={this.props.id}
            onChange={this.props.onChange}
            value={this.props.text}
          ></textarea>
        </div>
      </div>
    );
  }
}

export default TextArea;
