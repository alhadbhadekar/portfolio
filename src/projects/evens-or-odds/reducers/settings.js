import { SET_GAME_STARTED, SET_INSTRUCTIONS_EXPANDED } from '../actions/types';

const DEFAULT_SETTINGS = {
    gameStarted: false,
    instructionsExpanded: false
};

const settingsReducer = (state = DEFAULT_SETTINGS, action) => {
    //return {foo: 'bar'};
    console.log('state', state, 'action', action);
    
    switch(action.type) {
        case SET_GAME_STARTED:
            return{
                ...state,
                gameStarted: action.gameStarted,
                //instructionsExpanded: state.instructionsExpanded
            };
        case SET_INSTRUCTIONS_EXPANDED:
            return{
                //gameStarted: state.gameStarted,
                //Instead of writing above line, we can write spread operator that will have current state
                //...state actually implies: 
                //gameStarted: state.gameStarted,
                //instructionsExpanded: state.instructionsExpanded
                ...state,
                instructionsExpanded: action.instructionsExpanded
            }; 
        default:
            return state;
    }
};

export default settingsReducer;