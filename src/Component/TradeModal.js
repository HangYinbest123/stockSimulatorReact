import React from "react";
import './css/TradeModal.css'
import AnimatedNumber from "animated-number-react";
import {formatValueToUSD} from '../Util/numberFormat';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


// props: balanceValue
export default class TradeModal extends React.Component {

    // props: symbol
    state = {quantity: null, tradeType: "Buy"};
    onSubmit = (event)=>{
        event.preventDefault();
        this.props.onTradeFormSubmit(this.props.symbol, this.props.unitCost, this.state.tradeType, this.state.quantity);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} keyboard={true}>
                <Modal.Header>
                    <Modal.Title>Confirm your order</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group as={Row} controlId="formPlaintextSymbol">
                            <Form.Label column sm="2">
                                Symbol
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={this.props.symbol}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextUnitCost">
                            <Form.Label column sm="2">
                                UnitCost
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={formatValueToUSD(this.props.unitCost)}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                TradeType
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control as="select" onChange={e => {
                                    this.setState({tradeType: e.target.value});
                                    console.log(e.target.value);
                                }
                                }>
                                    <option>Buy</option>
                                    <option>Sell</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextQuantity">
                            <Form.Label column sm="2">
                                Quantity
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="int" placeholder="Quantity" onChange={e => this.setState({quantity: e.target.value})}/>
                            </Col>
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.onSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        );

    }
}