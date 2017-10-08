import React from 'react';

class DesignItem extends React.Component {
    toggleDislike = () => {
        switch (this.state.rating) {
            case 'DISLIKE': 
                this.setState({ rating: 'NONE' });
                break;
            default:
                this.setState({ rating: 'DISLIKE'});
        }
    };

    toggleLike = () => {
        switch (this.state.rating) {
            case 'LIKE': 
                this.setState({ rating: 'NONE' });
                break;
            default:
                this.setState({ rating: 'LIKE'});
        }
    };

    render() {
        return (
            <div className='ui centered card'>
                <div className='image'>
                    <img 
                    	src={this.props.src} 
                    	alt={this.props.name}
                    />
                </div>
                <div className='content'>
                    <a className='header'>{this.props.name}</a>
                    <div className='meta'>
                        <span className='keyword'>{this.props.keyword}</span>
                    </div>
                </div>
                <div className='extra content'>
                    <span className='left floated'>
                        <i 
                            className={'flipped large ' + (this.props.rating === 'DISLIKE' ? 'red thumbs down ' : 'thumbs outline down ') + 'icon'}
                            onClick={this.props.onDownVote}
                        />
                        Dislike
                    </span>
                    <span className='right floated'>
                        <i 
                            className={'large ' + (this.props.rating === 'LIKE' ? 'green thumbs up ' : 'thumbs outline up ') + 'icon'}
                            onClick={this.props.onUpVote}
                        />
                        Like
                    </span>
                </div>
            </div>
        );
    }
}

export default DesignItem;