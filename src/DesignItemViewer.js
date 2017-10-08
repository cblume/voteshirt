import React from 'react';

import DesignItem from './DesignItem';

const DesignItemViewer = (props) => {

	/*
		If `props.loadMoreDesigns === true` a plus sign rather than a right pointing chevron will be rendered
		on the right side of the displayed design, indicating the ability to load more designs (matching the 
		same keyword).
	*/
    let rightButton;
    if (props.loadMoreDesigns) {
        rightButton = <i className='large plus icon' onClick={props.onLoadMoreDesigns} />;
    } else {
        rightButton = <i className='large chevron right icon' onClick={props.onSkipForward} />;
    }

    return (
        <div className='row'>
            <div className='sixteen wide mobile twelve wide computer column'>
                <div className='ui three column centered grid'>
                    <div className='three wide mobile one wide computer middle aligned column'>
                        <i 
                            className={(props.disableBackward ? 'disabled ' : '') + 'large chevron left icon'} 
                            onClick={props.onSkipBackward}
                        />
                    </div>
                    <div className='ten wide mobile seven wide computer column'>
                        <DesignItem
                            src={props.design.src}
                            name={props.design.name}
                            rating={props.design.rating}
                            keyword={props.keyword}
                            onUpVote={props.onUpVote}
                            onDownVote={props.onDownVote}
                        />
                    </div>
                    <div className='three wide mobile one wide computer middle aligned column'>
                        {rightButton}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DesignItemViewer;