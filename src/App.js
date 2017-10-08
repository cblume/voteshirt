import React from 'react';

import SearchSubmit from './SearchSubmit';
import FinishVotingButton from './FinishVotingButton';
import VotingView from './VotingView';
import NewVoteButton from './NewVoteButton';
import VotingStatistics from './VotingStatistics';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends React.Component {
    state = {
        keyword: '',
        offset: 0,
        designs: [],
        statistics: [],
        votingState: 'READY', // IN_PROGRESS, NEW_SEARCH, ENDED
    };


    /*
        When fetchig new designs from the server, there are two cases to differentiate:
            1) `keyword === this.state.keyword`
                In this case the app is fetching a *new* batch of `this.props.limit` designs
                matching `keyword`, using an `offset` so we actually get new ones. 
                Already available statistics (containing the up- and down-vote counts for each keyword)
                are copied over.  
            2) `keyword !== this.state.keyword`
                The fetching process is similar to the first case, with the distinction that the `offset`
                is being reset to 0. This makes sure we get the first batch of designs. Furthermore,
                a new statistics object is being initialized and concatinated to the already exisiting (or empty)
                statistics array.
    */
    searchForDesigns = (keyword) => {
        let offset;
        let newKeywordStatistics;

        if (this.state.keyword === keyword) {
            offset = this.state.offset;
            newKeywordStatistics = [ ...this.state.statistics ];
        } else {
            offset = 0;
            newKeywordStatistics = this.state.statistics.concat({ keyword, downVotes: 0, upVotes: 0 });
        }
        
        fetch(`http://api.spreadshirt.net/api/v1/shops/205909/designs?mediaType=json&query=${keyword}&limit=${this.props.limit}&offset=${offset}`)
        .then(this.checkStatus)
        .then(response => (response.json()))
        .then(this.transformJson)
        .then(newDesigns => {
            if (newDesigns.length > 0) {
                this.setState({
                    keyword,
                    offset: offset + this.props.limit,
                    designs: this.state.designs.concat(newDesigns),
                    votingState: 'IN_PROGRESS',
                    statistics: newKeywordStatistics,
                });
            } 
        });
    };

    checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            const error = new Error(`HTTP Error ${response.statusText}`);
            error.status = response.statusText;
            error.response = response;
            console.log(error);
            throw error;
        }
    };


    /*
        The returned JSON response coming from the server is being transformed to better fit the needs of the application.
        Only the important properties (`id`, `name` and `resources.href` as `src`) are carried over. Besides that a `rating` 
        property is introduced to keep track of each design's rating.
    */
    transformJson = (json) => {
        return json.designs.map((el) => (
            {
                id: el.id,
                name: el.name,
                src: el.resources[0].href,
                rating: 'NONE',
            }
        ));
    };

    getNextDesigns = () => {
        this.searchForDesigns(this.state.keyword);
    };

    handleKeywordSubmit = (keyword) => {
        this.searchForDesigns(keyword);
    };

    handleFinishVotingClick = () => {
        this.setState({
            votingState: 'ENDED',
        });
    };

    handleNewSearchClick = () => {
        this.setState({
            votingState: 'NEW_SEARCH',
        });
    };

    handleNewVoteClick = () => {
        this.setState({
            keyword: '',
            offset: 0,
            designs: [],
            statistics: [],
            votingState: 'READY',
        });
    };

    handleVote = (index, keyword, vote) => {
        const ratedDesign = {
            ...this.state.designs[index],
            rating: vote
        };

        const keywordIndex = this.state.statistics.findIndex((s) => (s.keyword === keyword));
        const keywordStatistic = this.state.statistics[keywordIndex];
        const newKeywordStatistic = Object.assign({}, keywordStatistic, {
            keyword,
            downVotes: vote === 'DISLIKE' ? keywordStatistic.downVotes + 1 : keywordStatistic.downVotes,
            upVotes: vote === 'LIKE' ? keywordStatistic.upVotes + 1 : keywordStatistic.upVotes
        });
        
        this.setState({
            designs: [
                ...this.state.designs.slice(0, index),
                ratedDesign,
                ...this.state.designs.slice(index + 1, this.state.designs.length)
            ],
            statistics: [
                ...this.state.statistics.slice(0, keywordIndex),
                newKeywordStatistic,
                ...this.state.statistics.slice(keywordIndex + 1, this.state.statistics.length),
            ],
        });
    };

    handleDownVote = (index, keyword) => {
        this.handleVote(index, keyword, 'DISLIKE');
    };

    handleUpVote = (index, keyword) => {
        this.handleVote(index, keyword, 'LIKE');
    };


    /*
        The application is keeping track of a `votingState` which encompasses four distinct states:
            1) `READY`
            2) `IN_PROGRESS`
            3) `NEW_SEARCH`
            4) `ENDED`
        
        These states are used to determine which component to render, starting with `READY` as the default state.
        If a fetch request was successful, the `votingState` changes to `IN_PROGESS` rendering the voting interface.
        If the user decides to search for a new keyword (without ending the voting process) `votingState` will be 
        changed to `NEW_SEARCH`. Not only does this render the search bar but also a button for the user to still 
        end the voting process. If a new keyword is being submitted, the `votingState` will change back to `IN_PROGRESS`.
        If the user decides to finally end the voting process, `votingState` will be set to `ENDED` which will render
        the voting summary.
    */
    render() {
        switch (this.state.votingState) {
            case 'NEW_SEARCH': {
                return (
                    <div className='six wide column'>
                        <div className='ui center aligned very padded basic segment'>   
                            <h3 className='ui green header'>Search for a keyword then vote on the designs!</h3>
                            <SearchSubmit
                                onSubmit={this.handleKeywordSubmit}
                            />
                        </div>
                        <FinishVotingButton
                            onFinishVoting={this.handleFinishVotingClick}
                        />
                    </div>
                );
            }
            case 'IN_PROGRESS': {
                return (
                    <div className='six wide column'>
                        <VotingView
                            onFinishVoting={this.handleFinishVotingClick}
                            onNewSearchClick={this.handleNewSearchClick}
                            keyword={this.state.keyword}
                            designs={this.state.designs} 
                            onUpVote={this.handleUpVote}
                            onDownVote={this.handleDownVote}
                            offset={this.state.offset}
                            limit={this.props.limit}
                            getNextDesigns={this.getNextDesigns}
                        />
                    </div>
                );
            } 
            case 'ENDED': {
                const statistics = this.state.statistics;
                const totalKeywords = statistics.length;
                let totalUpVotes = 0;
                let totalDownVotes = 0;
                statistics.forEach((keyword) => {
                    totalUpVotes += keyword.upVotes;
                    totalDownVotes += keyword.downVotes;
                });
                
                const upVoteStatistics = [
                    ['Keyword', 'number of up-votes'],
                    ...(statistics.map((s) => [s.keyword, s.upVotes])),
                ];

                const downVoteStatistics = [
                    ['Keyword', 'number of down-votes'],
                    ...(statistics.map((s) => [s.keyword, s.downVotes])),
                ];

                return (
                    <div className='ten wide column'>
                        <div className='ui basic segment'>
                            <NewVoteButton 
                                onNewVote={this.handleNewVoteClick}
                            />
                            <VotingStatistics 
                                totalUpVotes={totalUpVotes}
                                totalDownVotes={totalDownVotes}
                                totalKeywords={totalKeywords}
                                upVoteStatistics={upVoteStatistics}
                                downVoteStatistics={downVoteStatistics}
                            />
                        </div>
                    </div>
                );
            }
            default: {
                return (
                    <div className='six wide tablet column'>
                        <div className='ui center aligned very padded basic segment'>
                            <h3 className='ui green header'>Search for a keyword then vote on the designs!</h3>
                            <SearchSubmit
                                onSubmit={this.handleKeywordSubmit}
                            />
                        </div>
                    </div>
                );
            }
        }
    }
}

export default App;
