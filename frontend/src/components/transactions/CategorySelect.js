import React, { Component } from "react";

function arrfilter(type, data) {
  return data.filter(category => category.type === type);
}

export class CategorySelect extends Component {
  render() {
    var income = arrfilter(1, this.props.categories);
    var recurring = arrfilter(2, this.props.categories);
    var expenses = arrfilter(3, this.props.categories);
    return (
      <div className="form-group">
        <label>Category</label>
        <select
          className="select form-control"
          onChange={this.props.onChange.bind(this, this.props.name)}
        >
          >
          <optgroup label="Income">
            {income.map(category => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Recurring Bills">
            {recurring.map(category => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Expenses">
            {expenses.map(category => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
    );
  }
}

export default CategorySelect;
