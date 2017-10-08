import React from 'react';

class SearchSubmit extends React.Component {
    state = {
        value: '',
    };

    onChange = (e) => {
        this.setState({ 
            value: e.target.value, 
        });
    };

    handleSubmit = (e) => {
        this.props.onSubmit(this.state.value);
        this.setState({
            value: '',
        });        
    };

    render() {
        return (
            <div className='ui action input'>
                <input 
                    type='text' 
                    placeholder='Enter a keyword...'
                    onChange={this.onChange}
                    value={this.state.value}
                />
                <button
                    className='ui large teal button'
                    onClick={this.handleSubmit}
                >
                    <i className='inverted search icon'></i>
                    Search!
                </button>
            </div>
        );
    }
}

export default SearchSubmit;