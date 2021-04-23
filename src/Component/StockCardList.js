import React from "react";

import StockCard from "./StockCard";
import './css/StockCardList.css';
import {ListGroup} from 'react-bootstrap';

export default class StockCardList extends React.Component {
    render() {
        // console.log("stocks props in StockCardList");
        // console.log(JSON.stringify(this.props.stocks));
        const stockCards = this.props.stocks.map(stock => {
            if(stock.quantity !== 0){
                return <StockCard onClickStockCard={this.props.onClickStockCard} key={stock["recordId"]} stock={stock}/>
            }else{
                return null;
            }
        });
        if(stockCards.length !== 0){
            return (
                <div >
                    <ListGroup>
                        <ListGroup.Item variant="secondary">Your Stock List</ListGroup.Item>
                        {stockCards}
                    </ListGroup>
                </div>
            );
        }else{
            return null;
        }
    }
}