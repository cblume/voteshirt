import React from 'react';
import { Chart } from 'react-google-charts';

const VotingStatistics = (props) => {
    const totalVotes = props.totalUpVotes + props.totalDownVotes; 
    const voteLabel = totalVotes === 1 ? 'vote' : 'votes';
    const keywordLabel = props.totalKeywords === 1 ? 'keyword' : 'keywords';
    let upVoteChart;
    let downVoteChart;

    /*
		If there are no up- or down-votes no chart displaying corresponding data should be rendered.
		Unfortunately, if no data is available there would still be a heading for the invisible chart.
		That's what this workaround is about.
    */
    if (props.totalUpVotes > 0) {
        upVoteChart = 
            <Chart
                chartTitle='Up-vote distribution'
                chartType='PieChart'
                width='100%'
                data={props.upVoteStatistics}
                options={{
                    'title': 'Up-vote distribution',
                    'pieHole': 0.3,
                    'is3D': false
                }}
            />;
    } 

    if (props.totalDownVotes > 0) {
        downVoteChart = 
            <Chart
                chartTitle='Down-vote distribution'
                chartType='PieChart'
                width='100%'
                data={props.downVoteStatistics}
                options={{
                    'title': 'Down-vote distribution',
                    'pieHole': 0.3,
                    'is3D': false
                }}
            />;
    } 

    return (
        <div className='row'>
            <div className='ui two statistics'>
                <div className='statistic'>
                    <div className='label'>
                        You've cast 
                    </div>
                    <div className='value'>
                        {totalVotes}
                    </div>
                    <div className='label'>
                        {voteLabel}
                    </div>
                </div>

                <div className='statistic'>
                    <div className='label'>
                        Over
                    </div>
                    <div className='value'>
                        {props.totalKeywords}
                    </div>
                    <div className='label'>
                        {keywordLabel}
                    </div>
                </div>
            </div>
            {upVoteChart}
            {downVoteChart}
        </div>
    );
};

export default VotingStatistics;