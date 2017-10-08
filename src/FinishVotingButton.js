import React from 'react';

const FinishVotingButton = (props) => (
    <div className='row'>
        <div className='fourteen wide mobile six wide computer column'>
            <button 
                className='ui fluid red button'
                onClick={props.onFinishVoting}
            >
                Finish Voting!
            </button>
        </div>
    </div>
);

export default FinishVotingButton;