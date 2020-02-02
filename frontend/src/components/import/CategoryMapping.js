import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CategorySelect from "../category/CategorySelect";

export class CategoryMapping extends Component {
  state = {
    categoryMap: {}
  };

  componentDidMount() {
    var data = this.props.data;
    var categories = new Set();
    var categoryMap = {};
    let i = this.props.cols["skip"] ? 1 : 0;
    for (i; i < data.length; i++) {
      let amountCol = this.props.cols["amount"].charCodeAt(0) - 65;
      let categoryCol = this.props.cols["category"].charCodeAt(0) - 65;
      if (data[i][amountCol] > 0) categories.add(data[i][categoryCol]);
    }
    categories.forEach(val => {
      categoryMap[val] = 0;
    });
    this.setState({ categoryMap: categoryMap });
  }

  onChange = (name, e) => {
    let catMap = this.state.categoryMap;
    catMap[name] = e.target.value;
    this.setState({ categoryMap: catMap });
    this.props.handleChange(name, e.target.value);
  };

  render() {
    console.log(this.state.categoryMap);
    return (
      <Card>
        <Card.Header>
          <h2>
            <span>
              <a
                className="button"
                style={{ cursor: "pointer" }}
                onClick={this.props.handleBack}
              >
                <i className="fas fa-angle-left mr-3" />
              </a>
            </span>
            Map CSV Columns
          </h2>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            Map categories defined in CSV to your categories to automatically
            fill field in next page.
          </Card.Title>
          <Card.Text>
            Mapping for each CSV category is optional. You will need to select a
            category for each transaction with unmapped CSV category.
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <table className="table">
            <thead>
              <tr>
                <th>CSV Category</th>
                <th>Your Category</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.state.categoryMap).map((key, index) => {
                return (
                  <tr key={index}>
                    <td>
                      {key}
                      <span className="float-right">
                        <i className="fas fa-arrow-right"></i>
                      </span>
                    </td>
                    <td>
                      <CategorySelect
                        onChange={this.onChange.bind(this, key)}
                        value={this.state.categoryMap[key]}
                        header={false}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Button
            variant="primary"
            type="button"
            onClick={this.props.handleSubmit}
          >
            Next Step
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default CategoryMapping;
