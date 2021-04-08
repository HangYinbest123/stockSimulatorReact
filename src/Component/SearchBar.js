import React from 'react';
import './css/SearchBar.css';

export default class SearchBar extends React.Component {
    state = {term: ''};

    onFormSubmit = event => {
        event.preventDefault();
        console.log("click");
        if(this.state.term && this.state.term.length !== 0){
            this.props.onSubmit(this.state.term);
        }
    };
    render() {
        return (
            <div className="ui segment searchbar">
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                        <div className="ui search">
                            <div className="ui icon input">
                                <input className="prompt" type="text" placeholder={this.props.placeholder}
                                       value={this.state.term}
                                       onChange={e => this.setState({term: e.target.value})}/>
                                <button onClick={this.onFormSubmit}><i className="search icon"></i></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

