import { GET_TRANSACTIONS, ADD_TRANSACTION } from "../actions/types.js";

const initialState = {
  transactions: [],
  transaction: new Object()
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
    default:
      return state;
  }
}
