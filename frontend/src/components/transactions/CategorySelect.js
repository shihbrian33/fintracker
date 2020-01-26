import React, { Component } from "react";

export class CategorySelect extends Component {
  render() {
    return (
      <div className="form-group">
        <label>Category</label>
        <select
          className="select form-control"
          onChange={this.props.onChange.bind(this, this.props.name)}
          value={this.props.value}
        >
          <optgroup label="Picnic">
            <option value="1">Salary</option>
            <option value="2">Ketchup</option>
            <option value="3">Relish</option>
          </optgroup>
          <optgroup label="Camping">
            <option value="4">Tent</option>
            <option value="5">Flashlight</option>
            <option value="6">Toilet Paper</option>
          </optgroup>
        </select>
      </div>
    );
  }
}

export default CategorySelect;
