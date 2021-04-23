import React from "react";
import AnimatedNumber from "animated-number-react";
import {formatValueToUSD} from '../Util/numberFormat';

// props: balanceValue
export default class BalanceCard extends React.Component {

    render() {

        return (
            <div className="balance-card" style={{textAlign: "left"}}>
                    Cash:
                    <span className="right" style={{float: "right"}}>
                        <AnimatedNumber
                            value={this.props.balance}
                            formatValue={formatValueToUSD}
                            duration={600}
                        />
                    </span>
            </div>
        );
    }
}