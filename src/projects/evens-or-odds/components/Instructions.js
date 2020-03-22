import React from 'react';
import { connect } from 'react-redux';
import { expandInstructions, collapseInstructions } from '../actions/settings';

const Instructions = props => {
    //console.log('props', props);
    const { instructionsExpanded, expandInstructions, collapseInstructions } = props;
    
    //Return when instructions expanded is true
    if (instructionsExpanded) {
        return (
            <div>
                <h3>Instructions</h3>
                <p>Welcome to evens or odds. The game goes like this</p>
                <p>The deck is shuffled. Then choose: will the next card be even or odd</p>
                <p>Make a choice on every draw, and see how many you get right!</p>
                <p>(Face cards don't count)</p>
                <br />
                <button onClick={collapseInstructions}>Show less</button>
            </div>
        );
    }
    //Return when instructions expanded is false

    return (
        <div>
            <h3>Instructions</h3>
            <p>Welcome to evens or odds. The game goes like this...</p>
            <br />
            <button onClick={expandInstructions}>Read more</button>
        </div>
    )
}

//It baiscally defineds what parts of redux store we want to grab
const mapStateToProps = state => {
    return { instructionsExpanded: state.settings.instructionsExpanded };
}

const mapDispatchToProps = dispatch => {
    //return keys whose methods are the ones we want to bind to component's this object
    return{
        expandInstructions: () => dispatch(expandInstructions()),
        collapseInstructions: () => dispatch(collapseInstructions())
    }
}

//This fucntion also attaches properties we return from mapStateToProps and attach it to props object of component


const componentConnector = connect(mapStateToProps, mapDispatchToProps);
export default componentConnector(Instructions);

//Above 2 lines can be shortenend to one line as below
//export default connect(mapStateToProps, mapDispatchToProps)(Instructions);


//Another way of writing all above code
//export default connect(
//    state => ({ instructionsExpanded: state.instructionsExpanded }), 
//    { expandInstructions, collapseInstructions }
//    )(Instructions);