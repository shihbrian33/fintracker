import React, { Component } from "react";
import CSVReader from "react-csv-reader";
import Step1 from "./Step1";

export class Import extends Component {
  constructor(props) {
    super(props);
    var cols = {};
    cols["date"] = 0;
    cols["amount"] = 0;
    cols["category"] = 0;
    cols["merchant"] = 0;
    this.state = {
      data: null,
      cols: cols,
      valid: false,
      step1: 0
    };
  }

  handleForce = data => {
    console.log(data);
    this.setState({ data: data });
  };

  handleStep1 = data => {
    console.log("Step1 submit");
    console.log(data);
  };

  handleStep1Change = event => {
    let cols = this.state.cols;
    let valid = false;
    let val = event.target.value.toUpperCase();
    if (val.length > 1) {
      val = val.charAt(val.length - 1);
    }

    cols[event.target.name] = val;
    if (cols["date"] && cols["amount"]) {
      valid = true;
    }
    console.log(cols);
    this.setState({ cols: cols, valid: valid });
  };

  render() {
    if (!this.state.data) {
      return (
        <Step1
          handleChange={this.handleStep1Change}
          valid={this.state.valid}
          vals={this.state.cols}
        />
        /*}
        <div className="container">
          <CSVReader
            cssClass="react-csv-input"
            onFileLoaded={this.handleForce}
      />*/
      );
    } else if (!this.state.step1) {
      return <Step1 />;
    }
  }
}

export default Import;
