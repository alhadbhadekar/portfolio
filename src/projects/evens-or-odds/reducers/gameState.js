import { SET_GUESS, SET_GAME_STARTED, DECK_DRAW } from '../actions/types';

const DEFAULT_GAME_STATE = { guess: '', correctGusses: 0 };

const EVENS = ['2', '4', '6', '8', '0'];

const ODDS = ['ACE', '3', '5', '7', '9'];


const gameStateReducer = (state = DEFAULT_GAME_STATE, action) => {
    
    console.log('state', state, 'action gne State', action);

    switch(action.type){
        case SET_GUESS:
            return{
                ...state,
                guess: action.guess
            };
        case SET_GAME_STARTED:
            return DEFAULT_GAME_STATE;
        case DECK_DRAW.FETCH_SUCCESS:
            const { value } = action.cards[0];
            const { guess, correctGusses } = state;

            if (
                (guess === 'even' && EVENS.includes(value)) || (guess === 'odd' && ODDS.includes(value))
            ) {
                return { ...state, correctGusses: correctGusses + 1 };
            }

            return state;

        default:
            return state;
    }
};

export default gameStateReducer;