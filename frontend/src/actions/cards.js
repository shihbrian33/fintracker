import axios from "axios";
import { GET_CARDS, DELETE_CARD, ADD_CARD, GET_CARD } from "./types";
import { tokenConfig } from "./auth";
import { createMessage } from "./messages";
import { returnErrors } from "./messages";

export const getCards = args => (dispatch, getState) => {
  var config = tokenConfig(getState);
  for (var name in args) {
    config.params[name] = args[name];
  }

  axios
    .get("/api/cards/", config)
    .then(res => {
      dispatch({
        type: GET_CARDS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getCard = id => (dispatch, getState) => {
  axios
    .get(`/api/cards/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_CARD,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteCard = id => (dispatch, getState) => {
  axios
    .delete(`/api/cards/${id}/`, tokenConfig(getState))
    .then(res => {
      //dispatch(createMessage({ deleteCard: 'Card Deleted' }));
      dispatch({
        type: DELETE_CARD,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addCard = card => (dispatch, getState) => {
  card.author = getState().auth.user.id;
  if (card.date_cancelled) {
    card.active = 0;
  }
  const request = axios.post("/api/cards/", card, tokenConfig(getState));

  request
    .then(res => {
      dispatch(createMessage({ addCard: "Card Added" }));
      dispatch({
        type: ADD_CARD,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });

  return request;
};

export const updateCard = (card, id) => (dispatch, getState) => {
  card.author = getState().auth.user.id;
  if (card.date_cancelled) {
    card.active = 0;
  }
  const request = axios.patch(`/api/cards/${id}/`, card, tokenConfig(getState));

  request
    .then(res => {
      dispatch(createMessage({ addCard: "Card Updated" }));
      dispatch({
        type: ADD_CARD,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("TESTING");
      dispatch(returnErrors(err.response.data, err.response.status));
    });

  return request;
};
