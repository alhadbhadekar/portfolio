import React from 'react';
import { connect } from 'react-redux';

const correctGuessesRecordKey = 'CORRECT_GUESSES_RECORD_f00123';

const checkRecord = correctGusses => {
    const record = Number(localStorage.getItem(correctGuessesRecordKey));

    if (correctGusses > record) {
        localStorage.setItem(correctGuessesRecordKey, correctGusses);

        return { record: correctGusses, isNewRecord: true};
    }

    return { record: record, isNewRecord: false};

};

const GameState = ({ remaining, correctGusses }) => {
    
    const guessText = correctGusses === 1 ? 'guess' : 'guesses'
    
    const { record, isNewRecord } = checkRecord(correctGusses);

    const recordLabel = isNewRecord ? '🎉 New Record' : 'Record';

    return (
        <div>
            <h3>{recordLabel}: {record} </h3>
            <p>{ remaining } cards remaining</p>
            <p>{ correctGusses } correct {guessText}</p>
        </div>
    );
}

export default connect(
   ({
       deck: { remaining },
       gameState: { correctGusses }
   }) => ({ remaining, correctGusses })
)(GameState);