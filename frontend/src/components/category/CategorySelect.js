import React, { Component } from "react";
import { getCategories } from "../../actions/transaction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function arrfilter(type, data) {
  return data.filter(category => category.type === type);
}

export class CategorySelect extends Component {
  static propTypes = {
    getCategories: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    var income = arrfilter(1, this.props.categories);
    var recurring = arrfilter(2, this.props.categories);
    var expenses = arrfilter(3, this.props.categories);
    return (
      <div className="form-group">
        {this.props.header && <label>Category</label>}
        <select
          className="select form-control"
          onChange={this.props.onChange}
          value={this.props.value}
        >
          <option disabled value="0" style={{ display: "none" }} />
          {this.props.income && (
            <optgroup label="Income">
              {income.map(category => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </optgroup>
          )}
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

const mapStateToProps = state => ({
  categories: state.transaction.categories
});

export default connect(mapStateToProps, { getCategories })(CategorySelect);
