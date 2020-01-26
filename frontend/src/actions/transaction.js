import axios from "axios";
import { ADD_TRANSACTION, GET_TRANSACTIONS } from "./types";
import { tokenConfig } from "./auth";

export const getTransactions = () => (dispatch, getState) => {
  axios
    .get("/api/transactions/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const addTransaction = transaction => (dispatch, getState) => {
  transaction.author = getState().auth.user.id;
  console.log(transaction);
  const request = axios.post(
    "/api/transactions/",
    transaction,
    tokenConfig(getState)
  );

  request
    .then(res => {
      dispatch({
        type: ADD_TRANSACTION,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });

  return request;
};
