import React from "react";
import AnimatedNumber from "animated-number-react";
import {numberFormat} from '../Util/numberFormat';
import './StockCard.css';

export default class StockCard extends React.Component {
    formatValue = (value) => {
        return numberFormat.format(value, 0);
    }

    render() {
        console.log("stocks props in StockCard");
        console.log(JSON.stringify(this.props.stock));
        return (
            <div className="stock-card">
                <div className="ui segment">
                    <div className="stock-card-name">{this.props.stock.longName}</div>
                    <div className="stock-card-quote">
                        <AnimatedNumber
                        value={this.props.stock.quote}
                        formatValue={this.formatValue}
                        duration={600}
                        />
                    </div>
                    <div>Quantity</div>
                    <div>{this.props.stock.quantity}</div>
                </div>
            </div>
        );
    }
}