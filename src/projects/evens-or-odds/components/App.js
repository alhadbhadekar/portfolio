import React, { Component } from 'react';
import { connect } from 'react-redux';
//connect returns another fucntion
import { startGame, cancelGame } from '../actions/settings';
import { fetchNewDeck } from '../actions/deck';
import fetchStates from '../reducers/fetchStates';
import Instructions from './Instructions';
import DrawCard from './DrawCard';
import Card from './Card';
import Guess from './Guess';
import GameState from './GameState';

class App extends Component {

    startGame = () => {
       //Dispatch action creator to redux store
       this.props.startGame();
       this.props.fetchNewDeck();
    }

    //startGame = () => {
    //    //Dispatching an action startGame
    //    this.props.dispatch(startGame());
    //    //Accessing this.props.dispatch as dispatch is a part of this.props. Look in console.log this json output
    //}
    //
    //cancelGame = () => {
    //    //Dispatching an action cancelGame
    //    this.props.dispatch(cancelGame());
    //    //Accessing this.props.dispatch as dispatch is a part of this.props. Look in console.log this json output
    //}

    render() {
        console.log('this', this);

        if(this.props.fetchState === fetchStates.error){
            return(
                <div>
                    <p>Please try reloading the app. An error occured.</p>
                    <p>{this.props.message}</p>
                </div>
            )
        }
        return(
            <div>
                <h2>♤ ♡ Evens or Odds ♢ ♧</h2>
                {
                    this.props.gameStarted ? (
                        <div>
                            <h3>The game is on!</h3>
                            <GameState />
                            <br />
                            <Guess />
                            <br />
                            <DrawCard />
                            <hr />
                            <Card />
                            <hr />
                            <button onClick={this.props.cancelGame}>Cancel Game</button>
                        </div>
                    ):(
                        <div>
                            <h3>A new game awaits</h3>
                            <br />
                            {/* Calling local helper method defined at the start and not the props one */}
                            <button onClick={this.startGame}>Start Game</button>
                            <hr />
                            <Instructions />                       
                        </div>
                    )
                }
            </div>
        );
    }
}

//to make connection between component and redux store
//It maps redux state to properties that will get attached to actual component
//It baiscally defineds what parts of redux store we want to grab
const mapStatetoProps = state => {
    console.log('state', state);

    //current state is accessible only in this method. So we pass it to connect method

    //const { gameStarted } = state.settings;
    //const { fetchState, message } = state.deck;

    //Above 2 lines const { gameStarted } = state.settings; const { fetchState, message } = state.deck; can be written as below

    const {
        settings: { gameStarted },
        deck: { fetchState, message }
    } = state; //This is equivalent to putting following 2 lines const { gameStarted } = state.settings; const { fetchState, message } = state.deck;

    return { gameStarted, fetchState, message };
    //All above variables will be assigned to this.props so that you can access them
}

//This method is used to attach action Creator method to props object of a component
//Automatically has access to dispatch methods of store within attached action creators
const mapDispatchToProps = dispatch => {
    //We return properties we want to attach to components this.props object
    return {
        //Each of these properties should map to a fucntion which fire relevant dispatch objects
        startGame: () => dispatch(startGame()),
        cancelGame: () => dispatch(cancelGame()),
        //fetchNewDeck: () => fetchNewDeck(dispatch)
        fetchNewDeck: () => dispatch(fetchNewDeck())
    };
}

//connect returns another fucntion
//componentConnector is a function returned by connect function
//mapDispatchToProps will assign a startGame and cancelGame to this.props. These functions have a callback that will dispatch dispatch(startGame())
//So if you do console.log(this) so will find 
//props:
//gameStarted: false
//startGame: ƒ startGame()
//cancelGame: ƒ cancelGame()
//__proto__: Object

//Use it in onClick functions

const componentConnector = connect(mapStatetoProps, mapDispatchToProps); //sending mapStateToProps as react will call that function to customize componentConnector result

//Above line can be written as this as well and get rid of mapDispatchToProps function

//const componentConnector = connect(
//    mapStatetoProps, 
//    { startGame, cancelGame, fetchNewDeck });



//That's how you connect App component to redux store
export default componentConnector(App);