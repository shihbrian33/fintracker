import { GET_CARDS, DELETE_CARD, ADD_CARD, GET_CARD } from '../actions/types.js';

const initialState = {
    cards: [],
    card: new Object()
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CARDS:
            return {
                ...state,
                cards: action.payload
            };
        case GET_CARD:
            return {
                ...state,
                card: action.payload
            };
        case DELETE_CARD:
            console.log('Delete Card');
            return {
                ...state,
                cards: state.cards.filter(card => card.id !== action.payload)
            };
        case ADD_CARD:
            return {
                ...state,
                cards: [...state.cards, action.payload]
            }
        default:
            return state;
    }
}