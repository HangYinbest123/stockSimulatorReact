import React from "react";

import StockCard from "./StockCard";
import './css/StockCardList.css';

export default class StockCardList extends React.Component {
    render() {
        console.log("stocks props in StockCardList");
        console.log(JSON.stringify(this.props.stocks));
        const stockCards = this.props.stocks.map(stock => {
            if(stock.quantity != 0){
                return <StockCard key={stock["recordId"]} stock={stock}></StockCard>
            }
        });
        return (
            <div className="stock-card-list ui segments">
                Your Stock List
                {stockCards}
            </div>
        );
    }
}