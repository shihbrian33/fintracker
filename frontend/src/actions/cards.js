import axios from 'axios';
import { GET_CARDS, DELETE_CARD, ADD_CARD } from './types';

export const getCards = () => (dispatch, getState) => {
    axios.get('/api/cards/')
        .then(res => {
            console.log("Got cards")
            dispatch({
                type: GET_CARDS,
                payload: res.data
            })
        }).catch(err => console.log(err));
}

export const deleteCard = (id) => (dispatch, getState) => {
    axios.delete(`/api/cards/${id}/`, tokenConfig(getState))
        .then(res => {
            //dispatch(createMessage({ deleteCard: 'Card Deleted' }));
            dispatch({
                type: DELETE_CARD,
                payload: id
            })
        }).catch(err => console.log(err));
}

export const addCard = (card) => (dispatch, getState) => {
    axios.post('/api/cards/', card, tokenConfig(getState))
        .then(res => {
            //dispatch(createMessage({ addCard: 'Card Added' }));
            dispatch({
                type: ADD_CARD,
                payload: res.data
            })
        }).catch(err => console.log(err));
}