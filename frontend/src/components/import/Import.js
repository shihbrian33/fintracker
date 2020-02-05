import React, { Component } from "react";
import ColumnDefine from "./ColumnDefine";
import CategoryMapping from "./CategoryMapping";
import TransactionMapping from "./TransactionMapping";
import ImportFinish from "./ImportFinish";
import UploadCSV from "./UploadCSV";

export class Import extends Component {
  constructor(props) {
    super(props);
    var cols = {};
    cols["date"] = 0;
    cols["amount"] = 0;
    cols["category"] = 0;
    cols["merchant"] = 0;
    cols["skip"] = false;
    this.state = {
      data: null,
      cols: cols,
      valid: false,
      step1: false,
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

  handleStep1Back() {
    this.setState({ data: null });
  }

  handleStep2Submit = data => {
    this.setState({ step2: true });
  };

  handleStep2Back() {
    this.setState({ step1: false, valid: false, cols: {} });
  }

  handleStep1Change = event => {
    let cols = this.state.cols;
    let valid = false;
    let val = event.target.value.toUpperCase();
    if (event.target.name == "skip") {
      cols["skip"] = event.target.checked;
    } else {
      cols[event.target.name] = val;
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
    this.setState({ step3: true, step2: true, transactions: transactions });
  };

  render() {
    if (!this.state.data) {
      return <UploadCSV onLoad={this.handleUpload.bind(this)} />;
    } else if (!this.state.step1) {
      return (
        <ColumnDefine
          handleChange={this.handleStep1Change}
          valid={this.state.valid}
          vals={this.state.cols}
          handleSubmit={this.handleStep1Submit}
          data={this.state.data}
          handleBack={this.handleStep1Back.bind(this)}
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
            handleBack={this.handleStep2Back.bind(this)}
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
