import React from 'react';

const NewVoteButton = (props) => (
    <div className='row'>
        <div className='column'>
            <button 
                className='ui fluid teal button'
                onClick={props.onNewVote}
            >
                Start a new vote!
            </button>
        </div>
    </div>
);

export default NewVoteButton;