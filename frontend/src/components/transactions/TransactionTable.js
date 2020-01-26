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
            {this.props.data.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.cat_name}</td>
                <td className="td-right">${transaction.amount}</td>
              </tr>
            ))}
            <tr>
              <td>Total</td>
              <td className="td-right">${this.props.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TransactionTable;
