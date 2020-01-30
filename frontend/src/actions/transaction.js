import axios from "axios";
import {
  ADD_TRANSACTION,
  GET_TRANSACTIONS,
  DELETE_TRANSACTION,
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY
} from "./types";
import { tokenConfig } from "./auth";

export const getTransactions = (month, year) => (dispatch, getState) => {
  var config = tokenConfig(getState);
  config.params["month"] = month;
  config.params["year"] = year;
  var req = axios
    .get("/api/transactions/", config)
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

export const deleteTransaction = id => (dispatch, getState) => {
  axios
    .delete(`/api/transactions/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_TRANSACTION,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getCategories = () => (dispatch, getState) => {
  axios
    .get("/api/categories/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_CATEGORIES,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const addCategory = category => (dispatch, getState) => {
  category.author = getState().auth.user.id;
  const request = axios.post(
    "/api/categories/",
    category,
    tokenConfig(getState)
  );

  request
    .then(res => {
      dispatch({
        type: ADD_CATEGORY,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });

  return request;
};

export const deleteCategory = id => (dispatch, getState) => {
  axios
    .delete(`/api/categories/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DELETE_CATEGORY,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
