import React from 'react';

const DesignItem = (props) => (
    <div className='ui centered card'>
        <div className='image'>
            <img 
            	src={props.src} 
            	alt={props.name}
            />
        </div>
        <div className='content'>
            <a className='header'>{props.name}</a>
            <div className='meta'>
                <span className='keyword'>{props.keyword}</span>
            </div>
        </div>
        <div className='extra content'>
            <span className='left floated'>
                <i 
                    className={'flipped large ' + (props.rating === 'DISLIKE' ? 'red thumbs down ' : 'thumbs outline down ') + 'icon'}
                    onClick={props.onDownVote}
                />
                Dislike
            </span>
            <span className='right floated'>
                <i 
                    className={'large ' + (props.rating === 'LIKE' ? 'green thumbs up ' : 'thumbs outline up ') + 'icon'}
                    onClick={props.onUpVote}
                />
                Like
            </span>
        </div>
    </div>
);

export default DesignItem;