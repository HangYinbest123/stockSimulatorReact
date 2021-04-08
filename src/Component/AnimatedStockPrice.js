import React from "react";
import AnimatedNumber from "animated-number-react";
import {numberFormat} from '../Util/numberFormat';
import './css/AnimatedStockPrice.css'

export default class AnimatedStockPrice extends React.Component {
    formatValue = (value) => {
        return numberFormat.format(value, 0);
    }
    render() {
        return (
            <div className="animated-stock-price">
                {this.props.longName}
                <br/>
                <AnimatedNumber
                    value={this.props.value}
                    formatValue={this.formatValue}
                    duration={600}
                />
            </div>
        );
    }
}