import React, { Component, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CategorySelect from "../category/CategorySelect";
import { addTransaction } from "../../actions/transaction";
import { getCards } from "../../actions/cards";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CategoryForm from "../category/CategoryForm";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

function ShowModal() {
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
          <CategoryForm close={handleSubmit} income={false} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export class TransactionMapping extends Component {
  state = {
    dateCol: -1,
    amountCol: -1,
    merchantCol: -1,
    categoryCol: -1,
    transactions: [],
    card: ""
  };

  static propTypes = {
    addTransaction: PropTypes.func.isRequired,
    getCards: PropTypes.func.isRequired
  };

  componentDidMount() {
    let dateCol = this.props.cols["date"]
      ? this.props.cols["date"].charCodeAt(0) - 65
      : -1;
    let amountCol = this.props.cols["amount"]
      ? this.props.cols["amount"].charCodeAt(0) - 65
      : -1;
    let merchantCol = this.props.cols["merchant"]
      ? this.props.cols["merchant"].charCodeAt(0) - 65
      : -1;
    let categoryCol = this.props.cols["category"]
      ? this.props.cols["category"].charCodeAt(0) - 65
      : -1;
    var transactions = [];
    this.props.data
      .filter(transaction => transaction[dateCol] && transaction[amountCol] > 0)
      .map(trans => {
        let transaction = {};
        var inputDate = new Date(Date.parse(trans[dateCol]));
        var formattedDate = inputDate.toISOString().substring(0, 10);
        transaction["date"] = formattedDate;
        transaction["amount"] = trans[amountCol];
        transaction["merchant"] = merchantCol ? trans[merchantCol] : "";
        if (categoryCol) {
          let catname = trans[categoryCol];
          transaction["category"] = this.props.catmap[catname];
        }
        transactions.push(transaction);
      });
    this.setState({
      dateCol: dateCol,
      amountCol: amountCol,
      merchantCol: merchantCol,
      categoryCol: categoryCol,
      transactions: transactions
    });
    var args = {
      active: 1
    };
    this.props.getCards(args);
  }

  onChange = (index, name, e) => {
    let transactions = this.state.transactions;
    transactions[index][name] = e.target.value;
    this.setState({ transactions: transactions });
  };

  onChangeCard = e => {
    this.setState({ card: e.target.value });
  };

  handleSubmit() {
    var transactions = this.state.transactions;
    if (this.state.card) {
      transactions.forEach(transaction => {
        transaction["card"] = this.state.card;
      });
    }
    this.props.addTransaction(transactions).then(() => {
      this.props.handleSummary(transactions);
    });
  }

  handleDelete = index => {
    let data = this.state.transactions;
    data.splice(index, 1);
    this.setState({ transactions: data });
  };

  render() {
    let valid = true;
    for (let i = 0; i < this.state.transactions.length; i++) {
      let transaction = this.state.transactions[i];
      if (!transaction.category || transaction.category == 0) {
        valid = false;
        break;
      }
    }
    return (
      <Card>
        <Card.Header>
          <h2>
            Transaction Category
            <span style={{ float: "right" }}>
              <ShowModal />
            </span>
          </h2>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            Select a category for each transaction imported from the CSV file.
          </Card.Title>
          <label>Optional: Link this import to a credit card</label>
          <select
            value={this.state.card}
            className="select form-control"
            onChange={this.onChangeCard.bind(this)}
            style={{ maxWidth: "20%" }}
          >
            <option value="" disabled style={{ display: "none" }}></option>
            {this.props.cards.map(card => {
              return (
                <option value={card.name} key={card.id}>
                  {card.name}
                </option>
              );
            })}
          </select>
        </Card.Body>
        <Card.Body>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Date</th>
                {this.state.merchantCol && <th>Merchant</th>}
                <th>Amount</th>
                <th>Note</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {this.state.transactions.map((transaction, index) => {
                return (
                  <tr key={index}>
                    <td style={{ width: "20px" }}>
                      <a
                        className="button"
                        style={{ cursor: "pointer" }}
                        onClick={this.handleDelete.bind(this, index)}
                      >
                        <i className="far fa-trash-alt" />
                      </a>
                    </td>
                    <td>{transaction.date}</td>
                    {this.state.merchantCol && <td>{transaction.merchant}</td>}
                    <td>{transaction.amount}</td>
                    <td>
                      <InputGroup>
                        <FormControl
                          onChange={this.onChange.bind(this, index, "notes")}
                          maxLength="50"
                        />
                      </InputGroup>
                    </td>
                    <td>
                      <CategorySelect
                        onChange={this.onChange.bind(this, index, "category")}
                        value={transaction.category ? transaction.category : 0}
                        header={false}
                        income={false}
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
            onClick={this.handleSubmit.bind(this)}
            disabled={!valid}
          >
            Next Step
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  cards: state.cards.cards
});

export default connect(mapStateToProps, { addTransaction, getCards })(
  TransactionMapping
);
