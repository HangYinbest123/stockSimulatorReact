import React from "react";
import './css/TradeModal.css'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Login from "./Login";


// props: balanceValue
export default class SignInModal extends React.Component {

    // props: symbol

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} keyboard={true}>
                <Modal.Header className="m-auto">
                    <Modal.Title>Welcome to trading simulator!</Modal.Title>
                </Modal.Header>
                <Modal.Body className="m-auto">
                    <Login onLoginSuccessfullyChange={this.props.onLoginSuccessfullyChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );

    }
}