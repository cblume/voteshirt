import React from 'react';

import KeywordSearchButton from './KeywordSearchButton';
import DesignItemViewer from './DesignItemViewer';
import FinishVotingButton from './FinishVotingButton';

class VotingView extends React.Component {
    state = {
        index: 0,
    };

    componentWillMount() {
        this.setState({
            index: this.props.designs.length - this.props.offset,
        });
    };

    getNextDesign = () => {
        if ((this.state.index + 1) < this.props.designs.length) {
            this.setState({
                index: this.state.index + 1,
            });
        }
    };

    getPreviousDesign = () => {
        if (this.state.index) {
            this.setState({
                index: this.state.index - 1,
            });
        }
    };

    render() { 
        return (
            <div className='ui one column centered grid'>
                <div className='spacer row'></div>
                <KeywordSearchButton 
                    onNewSearch={this.props.onNewSearchClick}
                />
                <DesignItemViewer 
                    index={this.state.index}
                    disableBackward={this.state.index === 0}
                    loadMoreDesigns={(this.state.index + 1) === this.props.designs.length}
                    onLoadMoreDesigns={this.props.getNextDesigns}
                    keyword={this.props.keyword}
                    design={this.props.designs[this.state.index]}
                    onSkipForward={this.getNextDesign}
                    onSkipBackward={this.getPreviousDesign}
                    onUpVote={() => {
                        this.getNextDesign();
                        this.props.onUpVote(this.state.index, this.props.keyword)
                    }}
                    onDownVote={() => {
                        this.getNextDesign();
                        this.props.onDownVote(this.state.index, this.props.keyword)
                    }}
                />
                <FinishVotingButton 
                    onFinishVoting={this.props.onFinishVoting}
                />
            </div>
        );
    }
}

export default VotingView;