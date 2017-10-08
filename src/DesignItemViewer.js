import React from 'react';

import DesignItem from './DesignItem';

class DesignItemViewer extends React.Component {
    render() {
        let rightButton;
        if (this.props.loadMoreDesigns) {
            rightButton = <i className='large plus icon' onClick={this.props.onLoadMoreDesigns} />;
        } else {
            rightButton = <i className='large chevron right icon' onClick={this.props.onSkipForward} />;
        }

        return (
            <div className='row'>
                <div className='sixteen wide mobile twelve wide computer column'>
                    <div className='ui three column centered grid'>
                        <div className='three wide mobile one wide computer middle aligned column'>
                            <i 
                                className={(this.props.disableBackward ? 'disabled ' : '') + 'large chevron left icon'} 
                                onClick={this.props.onSkipBackward}
                            />
                        </div>
                        <div className='ten wide mobile seven wide computer column'>
                            <DesignItem
                                src={this.props.design.src}
                                name={this.props.design.name}
                                rating={this.props.design.rating}
                                keyword={this.props.keyword}
                                onUpVote={this.props.onUpVote}
                                onDownVote={this.props.onDownVote}
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
}

export default DesignItemViewer;