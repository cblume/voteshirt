import React from 'react';

const KeywordSearchButton = (props) => (
    <div className='row'>
        <div className='fourteen wide mobile six wide computer column'>
            <button 
                className='ui fluid teal button'
                onClick={props.onNewSearch}
            >
                <i className='left arrow circle icon' />
                Back to keyword search
            </button>
        </div>
    </div>
);

export default KeywordSearchButton;