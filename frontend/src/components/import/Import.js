import React, { Component } from "react";
import CSVReader from "react-csv-reader";
import ColumnDefine from "./ColumnDefine";
import CategoryMapping from "./CategoryMapping";
import TransactionMapping from "./TransactionMapping";
import ImportFinish from "./ImportFinish";

export class Import extends Component {
  constructor(props) {
    super(props);
    var cols = {};
    cols["date"] = "A";
    cols["amount"] = "E";
    cols["category"] = "D";
    cols["merchant"] = "C";
    cols["skip"] = true;
    this.state = {
      data: null,
      cols: cols,
      valid: false,
      step1: true,
      step2: false,
      step3: false,
      categoryMap: {},
      transactions: []
    };
  }

  handleUpload = data => {
    this.setState({ data: data });
  };

  handleStep1Submit = data => {
    this.setState({ step1: true });
  };

  handleStep2Submit = data => {
    this.setState({ step2: true });
  };

  handleStep1Change = event => {
    let cols = this.state.cols;
    let valid = false;

    if (event.target.name == "skip") {
      cols["skip"] = event.target.checked;
    } else {
      let val = event.target.value.toUpperCase();
      if (val.length >= 1) {
        val = val.charAt(val.length - 1);
        let alpha = /^[A-Za]$/;
        if (val.match(alpha)) cols[event.target.name] = val;
      } else {
        cols[event.target.name] = 0;
      }
    }
    if (cols["date"] && cols["amount"]) {
      valid = true;
    }
    this.setState({ cols: cols, valid: valid });
  };

  handleCatMapChange = (name, value) => {
    let catMap = this.state.categoryMap;
    catMap[name] = value;
    this.setState({ categoryMap: catMap });
  };

  transactionTotals = transactions => {
    this.setState({ step3: true, transactions: transactions });
  };

  render() {
    if (!this.state.data) {
      return (
        <div className="container">
          <CSVReader
            cssClass="react-csv-input"
            onFileLoaded={this.handleUpload}
          />
        </div>
      );
    } else if (!this.state.step1) {
      return (
        <ColumnDefine
          handleChange={this.handleStep1Change}
          valid={this.state.valid}
          vals={this.state.cols}
          handleSubmit={this.handleStep1Submit}
        />
      );
    } else if (!this.state.step2) {
      if (this.state.cols["category"]) {
        return (
          <CategoryMapping
            data={this.state.data}
            cols={this.state.cols}
            handleChange={this.handleCatMapChange}
            handleSubmit={this.handleStep2Submit}
          />
        );
      } else {
        return (
          <TransactionMapping
            data={this.state.data}
            catmap={this.state.categoryMap}
            cols={this.state.cols}
            handleSummary={this.transactionTotals}
          />
        );
      }
    } else if (!this.state.step3) {
      return (
        <TransactionMapping
          data={this.state.data}
          catmap={this.state.categoryMap}
          cols={this.state.cols}
          handleSummary={this.transactionTotals}
        />
      );
    } else {
      return <ImportFinish transactions={this.state.transactions} />;
    }
  }
}

export default Import;
