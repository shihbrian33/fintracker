import React, { Component } from "react";
import CategorySelect from "./CategorySelect";
import DatePicker from "react-datepicker";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export class TransactionForm extends Component {
  onSubmit = e => {
    console.log("submit");
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col-xl-6">
            <CategorySelect />
          </div>
          <div className="col-xl-6">
            <label>Amount</label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fas fa-dollar-sign"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Amount (to the nearest dollar)" />
            </InputGroup>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label
              className="control-label requiredField"
              htmlFor="id_transaction_date"
            >
              Date
            </label>
            <DatePicker
              className="form-control"
              value=""
              todayButton="Today"
              required={true}
            />
          </div>
          <div className="col-xl-6">
            <label>Note</label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fas fa-sticky-note"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl />
            </InputGroup>
          </div>
        </div>
        <div className="form-group mt-3 ">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ float: "right" }}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default TransactionForm;
