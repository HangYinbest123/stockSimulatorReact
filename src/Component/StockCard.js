import React from "react";
import AnimatedNumber from "animated-number-react";
import {formatValueToUSD} from '../Util/numberFormat';
import './css/StockCard.css';

export default class StockCard extends React.Component {

    render() {
        console.log("stocks props in StockCard");
        console.log(JSON.stringify(this.props.stock));
        return (
            <div className="stock-card">
                <div className="ui segment">
                    <div className="stock-card-name">{this.props.stock.symbol}
                        <span className="stock-card-quote" style={{float: "right"}}>
                        <AnimatedNumber
                            value={this.props.stock.quote}
                            formatValue={formatValueToUSD}
                            duration={600}
                        />
                    </span>
                    </div>

                    <div>
                        Quantity
                        <span style={{float: "right"}}>{this.props.stock.quantity}</span>
                    </div>

                    <div>
                        Unit Cost
                        <span style={{float: "right"}}>
                            <AnimatedNumber
                                value={this.props.stock.unitCost}
                                formatValue={formatValueToUSD}
                                duration={600}
                            /></span>
                    </div>

                </div>
            </div>
        );
    }
}