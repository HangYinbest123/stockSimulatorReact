import React from "react";
import AnimatedNumber from "animated-number-react";
import {formatValueToUSD} from '../Util/numberFormat';

// props: balanceValue
export default class TotalAssetCard extends React.Component {
    getAssetPercentageChange(){
        let directDeposit = this.props.directDeposit;
        if(directDeposit === null || directDeposit === 0){
            return null;
        }
        let percentageChange = ((this.props.value-directDeposit)/directDeposit * 100);
        if(percentageChange >= 0){
            percentageChange = <span style={{color: "green"}}>{'+' + percentageChange.toFixed(4) +'%'}</span>;
        }else{
            percentageChange = <span style={{color: "red"}}>{percentageChange.toFixed(4) +'%'}</span>;
        }
        return percentageChange;
    }


    render() {

        return (

            <div className="total-asset-card" style={{textAlign: "left"}}>

                    Total Asset:
                    <span className="right" style={{float: "right"}}>
                        <AnimatedNumber
                            value={this.props.value}
                            formatValue={formatValueToUSD}
                            duration={600}
                        /> ({this.getAssetPercentageChange()})
                    </span>

            </div>
        );
    }
}