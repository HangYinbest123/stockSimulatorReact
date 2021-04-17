import React from 'react';
import './css/SearchBar.css';
import {Form, FormControl, Button} from "react-bootstrap";

export default class SearchBarV2 extends React.Component {
    state = {term: ''};

    onFormSubmit = event => {
        event.preventDefault();
        if (this.state.term && this.state.term.length !== 0) {
            this.props.onSubmit(this.state.term);
        }
    };

    render() {
        return (
            <Form inline>
                <FormControl onChange={e => {
                    this.setState({term: e.target.value});
                }} type="text" placeholder="Enter company name or stock symbol" className="mr-sm-2"/>
                <Button variant="outline-primary">Search</Button>
            </Form>
        );
    }
}

