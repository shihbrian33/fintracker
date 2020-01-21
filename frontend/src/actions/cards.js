import axios from 'axios';
import { GET_CARDS, DELETE_CARD, ADD_CARD, GET_CARD } from './types';

export const getCards = () => (dispatch, getState) => {
    axios.get('/api/cards/')
        .then(res => {
            dispatch({
                type: GET_CARDS,
                payload: res.data
            })
        }).catch(err => console.log(err));
}

export const getCard = (id) => (dispatch, getState) => {
    axios.get(`/api/cards/${id}/`)
        .then(res => {
            dispatch({
                type: GET_CARD,
                payload: res.data
            })
        }).catch(err => console.log(err));
}

export const deleteCard = (id) => (dispatch, getState) => {
    axios.delete(`/api/cards/${id}/`)
        .then(res => {
            //dispatch(createMessage({ deleteCard: 'Card Deleted' }));
            dispatch({
                type: DELETE_CARD,
                payload: id
            })
        }).catch(err => console.log(err));
}

export const addCard = (card) => (dispatch, getState) => {
    axios.post('/api/cards/', card)
        .then(res => {
            //dispatch(createMessage({ addCard: 'Card Added' }));
            dispatch({
                type: ADD_CARD,
                payload: res.data
            })
        }).catch(err => console.log(err));
}