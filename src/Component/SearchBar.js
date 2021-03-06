import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component {
    state = {term: ''};

    onFormSubmit = event => {
        event.preventDefault();

        this.props.onSubmit(this.state.term);
    };

    render() {
        return (
            <div className="ui segment">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                        <div className="ui search">
                            <div className="ui icon input">
                                <input className="prompt" type="text" placeholder={this.props.placeholder}
                                       value={this.state.term}
                                       onChange={e => this.setState({term: e.target.value})}/>
                                <i className="search icon"></i>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

