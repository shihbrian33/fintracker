import React, { Component } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addCategory } from "../../actions/transaction";

export class CategoryForm extends Component {
  static propTypes = {
    addCategory: PropTypes.func.isRequired
  };

  state = {
    type: 1,
    name: null
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, type } = this.state;
    const category = { name, type };
    this.props.addCategory(category);
  };

  onChange = (name, e) => {
    this.setState({ [name]: e.target.value });
  };

  componentDidMount() {
    if (!this.props.income) {
      this.setState({ type: 2 });
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col-xl-6">
            <label>Category Type</label>
            <select
              className="select form-control"
              onChange={this.onChange.bind(this, "type")}
            >
              {this.props.income && <option value="1">Income</option>}
              <option value="2">Recurring Bill</option>
              <option value="3">Expense</option>
            </select>
          </div>
          <div className="col-xl-6">
            <label>Name</label>
            <InputGroup>
              <FormControl onChange={this.onChange.bind(this, "name")} />
            </InputGroup>
          </div>
        </div>
        <div className="form-group mt-3 ">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ float: "right" }}
            onClick={this.props.close}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default connect(null, { addCategory })(CategoryForm);
