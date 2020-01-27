import {
  GET_TRANSACTIONS,
  ADD_TRANSACTION,
  GET_CATEGORIES,
  DELETE_TRANSACTION
} from "../actions/types.js";

const initialState = {
  transactions: [],
  transaction: new Object(),
  categories: [],
  category: new Object()
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      };
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          transaction => transaction.id !== action.payload
        )
      };
    default:
      return state;
  }
}
