import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './components/App';
import rootReducer from './reducers';
import './index.css';

// State is following in console log
//state {gameStarted: true, instructionsExpanded: false}

//Action is following in colsole.log
//action {type: "SET_GAME_STARTED", gameStarted: false} and {type: "SET_INSTRUCTIONS_EXPANDED", instructionsExpanded: true}

const store = createStore(rootReducer, applyMiddleware(thunk));

//const action1 = startGame();
//store.dispatch(action1);

//console.log('store.getState()', store.getState());

//store.dispatch({ type: 'foo'});
//store.dispatch({ type: 'bar'});
//Instead of writing extra lines above, we can directly write action creator in dispatch as below

//console.log('*****************');

//console.log('Start Game');
//store.dispatch(startGame());
//console.log('expandInstructions');
//store.dispatch(expandInstructions());
//console.log('cancelGame');
//store.dispatch(cancelGame());
//console.log('cancelInstructions');
//store.dispatch(cancelInstructions());


const EvensOrOdds = () => {
    return(
    <Provider store={store}>
        <App />
    </Provider>
    )
}

export default EvensOrOdds;