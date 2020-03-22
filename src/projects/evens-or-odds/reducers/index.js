import { combineReducers } from 'redux';
import settingsReducer from './settings';
import deckReducer from './deck';
import gameStateRecuder from './gameState';
import gameStateReducer from './gameState';

//Mapping a key settings and deck. So that in components, you can call this.props.settings.startGame. Else you will have to call this.props.settingsReducer.startGame
export default combineReducers({ 
    settings: settingsReducer, 
    deck: deckReducer ,
    gameState: gameStateReducer
});
