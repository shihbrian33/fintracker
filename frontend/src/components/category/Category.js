import React, { Component, Fragment, useState } from "react";
import { getCategories } from "../../actions/transaction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function arrfilter(type, data) {
  return data.filter(category => category.type === type);
}

function ShowModal(date) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    setShow(false);
  };
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>TEST</Modal.Body>
      </Modal>
    </>
  );
}

export class Category extends Component {
  static propTypes = {
    getCategories: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    var income = arrfilter(1, this.props.categories);
    var recurring = arrfilter(2, this.props.categories);
    var expenses = arrfilter(3, this.props.categories);
    return (
      <Fragment>
        <h2 className="m-0 font-weight-bold mb-3" id="categoryHeader">
          Categories
          <span style={{ float: "right" }}>
            <ShowModal />
          </span>
        </h2>
        <div className="categories-list" id="categories">
          <table className="category">
            <thead>
              <tr>
                <th>Income</th>
              </tr>
            </thead>
            <tbody>
              {income.map(category => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="category">
            <thead>
              <tr>
                <th>Recurring Bills</th>
              </tr>
            </thead>
            <tbody>
              {recurring.map(category => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="category">
            <thead>
              <tr>
                <th>Expenses</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(category => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.transaction.categories
});

export default connect(mapStateToProps, { getCategories })(Category);
