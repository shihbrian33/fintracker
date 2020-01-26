import React, { Component } from "react";

export class CategorySelect extends Component {
  render() {
    return (
      <div className="form-group">
        <label>Category</label>
        <select className="select form-control">
          <optgroup label="Picnic">
            <option>Mustard</option>
            <option>Ketchup</option>
            <option>Relish</option>
          </optgroup>
          <optgroup label="Camping">
            <option>Tent</option>
            <option>Flashlight</option>
            <option>Toilet Paper</option>
          </optgroup>
        </select>
      </div>
    );
  }
}

export default CategorySelect;
