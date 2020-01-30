import React, { Component, Fragment, useState } from "react";
import { getCategories, deleteCategory } from "../../actions/transaction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CategoryForm from "./CategoryForm";

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
        <Modal.Body>
          <CategoryForm close={handleSubmit} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export class Category extends Component {
  state = {
    loaded: 0
  };

  static propTypes = {
    getCategories: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getCategories();
  }

  componentWillReceiveProps() {
    this.setState({ loaded: 1 });
  }

  handleDelete = id => {
    this.props.deleteCategory(id);
  };

  render() {
    var income = arrfilter(1, this.props.categories);
    var recurring = arrfilter(2, this.props.categories);
    var expenses = arrfilter(3, this.props.categories);
    if (this.state.loaded) {
      return (
        <Fragment>
          <h2 className="m-0 font-weight-bold mb-3" id="categoryHeader">
            Categories
            <span style={{ float: "right" }}>
              <ShowModal />
            </span>
          </h2>
          <div className="categories-list" id="categories">
            <table className="category" id="category">
              <thead>
                <tr>
                  <th>Income</th>
                </tr>
              </thead>
              <tbody>
                {income.map(category => (
                  <tr key={category.id}>
                    <td>
                      {category.name}
                      <a
                        className="button"
                        style={{ float: "right" }}
                        onClick={this.handleDelete.bind(this, category.id)}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="category" id="category">
              <thead>
                <tr>
                  <th>Recurring Bill</th>
                </tr>
              </thead>
              <tbody>
                {recurring.map(category => (
                  <tr key={category.id}>
                    <td>
                      {category.name}
                      <a
                        className="button"
                        style={{ float: "right" }}
                        onClick={this.handleDelete.bind(this, category.id)}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="category" id="category">
              <thead>
                <tr>
                  <th>Expense</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(category => (
                  <tr key={category.id}>
                    <td>
                      {category.name}
                      <a
                        className="button"
                        style={{ float: "right" }}
                        onClick={this.handleDelete.bind(this, category.id)}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Fragment>
      );
    } else return null;
  }
}

const mapStateToProps = state => ({
  categories: state.transaction.categories
});

export default connect(mapStateToProps, { getCategories, deleteCategory })(
  Category
);
