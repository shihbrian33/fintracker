import React, { Component } from "react";
import CSVReader from "react-csv-reader";

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
      cols: cols
    };
  }
  state = {
    data: null
  };

  handleForce = data => {
    this.setState({ data: data });
  };

  render() {
    if (!this.state.data) {
      return (
        <div className="container">
          <CSVReader
            cssClass="react-csv-input"
            onFileLoaded={this.handleForce}
          />
        </div>
      );
    } else {
      return <div>TEST</div>;
    }
  }
}

export default Import;
