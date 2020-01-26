import React, { Component } from "react";

export class TransactionTable extends Component {
  render() {
    return (
      <div className="col-xl-6">
        <table className="table" id="transaction">
          <thead>
            <tr>
              <th colSpan="2">{this.props.tablename}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Salary</td>
              <td className="td-right">$321</td>
            </tr>
            <tr>
              <td>Recurring Bills</td>
              <td className="td-right">$321</td>
            </tr>
            <tr>
              <td>Expenses</td>
              <td className="td-right">$321</td>
            </tr>
            <tr>
              <td>Total</td>
              <td className="td-right">$321</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TransactionTable;
