import React, { Component } from "react";
import CSVReader from "react-csv-reader";
import Card from "react-bootstrap/Card";

export class UploadCSV extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <h2>Upload CSV</h2>
        </Card.Header>
        <CSVReader
          cssClass="react-csv-input"
          onFileLoaded={this.props.onLoad}
        />
      </Card>
    );
  }
}

export default UploadCSV;
