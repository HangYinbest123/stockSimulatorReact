import React from "react";
import './css/TradeModal.css'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


// props: balanceValue
export default class FundReceivedModal extends React.Component {

    // props: symbol


    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide} keyboard={true}>
                <Modal.Header>
                    <Modal.Title>Fund Available!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Congratulation! Your $10,000 Trading Fund is Available!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Start your trading journey
                    </Button>
                </Modal.Footer>
            </Modal>
        );

    }
}