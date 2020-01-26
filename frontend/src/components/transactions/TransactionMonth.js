import React, { Component, Fragment, useState } from "react";
import TransactionTable from "./TransactionTable";
import TransactionForm from "./TransactionForm";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ShowModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Transaction
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionForm />
        </Modal.Body>
      </Modal>
    </>
  );
}

export class TransactionMonth extends Component {
  render() {
    return (
      <Fragment>
        <h2 className="m-0 font-weight-bold text-center mb-3">
          <a href="#" className="text-decoration-none mr-3">
            <i className="fas fa-angle-left" />
          </a>
          January 2020
          <a href="#" className="text-decoration-none ml-3">
            <i className="fas fa-angle-right" />
          </a>
          <span style={{ float: "right" }}>
            <ShowModal />
          </span>
        </h2>
        <div className="row mx-2 my-1">
          <TransactionTable tablename="Income" />
          <TransactionTable tablename="Total" />
        </div>
        <div className="row mx-2 my-1">
          <TransactionTable tablename="Recurring Bills" />
        </div>
        <div className="row mx-2 my-1">
          <TransactionTable tablename="Expenses" />
        </div>
      </Fragment>
    );
  }
}

export default TransactionMonth;
