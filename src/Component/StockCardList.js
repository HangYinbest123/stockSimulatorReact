import React from "react";

import StockCard from "./StockCard";
import './StockCardList.css';

export default class StockCardList extends React.Component {
    render() {
        console.log("stocks props in StockCardList");
        console.log(JSON.stringify(this.props.stocks));
        const stockCards = this.props.stocks.map(stock => {
           return <StockCard key={stock.id} stock={stock}></StockCard>
        });
        return (
            <div className="stock-card-list ui segments">
                <h2>Your Stocks</h2>
                <div>(Using fake data, API in development...)</div>
                {stockCards}
            </div>
        );
    }
}