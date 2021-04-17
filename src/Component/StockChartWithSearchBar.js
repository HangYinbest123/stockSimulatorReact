import React, {Component} from 'react'
import Chart from "./Chart";
import SearchBar from "./SearchBar";
import {YahooFinancial} from "../api/YahooFinancial";

import './css/StockChartWithSearchBar.css'
import AnimatedStockPrice from "./AnimatedStockPrice";
import {Button, ButtonToolbar} from "react-bootstrap";
import TradeModal from "./TradeModal";

import {trade} from "../api/StockSimulator";


const GET_CHART_URL = "/stock/v2/get-chart";
const GET_QUOTE_URL = "/market/v2/get-quotes";
const GET_AUTO_COMPLETE = "auto-complete";

export default class StockChartWithSearchBar extends Component {
    state = {
        data: [],
        symbol: "TSLA",
        currentQuote: null,
        postMarketPrice: null,
        regularMarketPrice: null,
        longName: null,
        showTradeModal: false,
        userId: null
    };

    OnSearchSubmit = async (term) => {
        // term = term.toUpperCase();

        await this.getStockSymbolByTermThenUpdateState(term);
        console.log("after await, symbol is: " + this.state.symbol);
    }
    componentDidMount = async () => {
        if(sessionStorage.getItem("lastCheckedStockSymbol") !== null){
            await this.setState({symbol: sessionStorage.getItem("lastCheckedStockSymbol")});
        }
        this.populateChartDataForLastYear();
        this.getQuote();
        // this.interval = setInterval(() => this.getQuote(), 3000);
        // window.addEventListener("focus", () => this.onFocus);
        // window.addEventListener("blur", () => this.onBlur);
    }

    onFocus = () => {
        this.interval = setInterval(() => this.getQuote(), 3000);
    }

    onBlur = () => {
        clearInterval(this.interval);
    }

    getStockSymbolByTermThenUpdateState = async (term) => {
        // autoComplete.get();
        YahooFinancial.get(GET_AUTO_COMPLETE, {
            params: {
                "q": term,
                "region": "US"
            }
        }).then(res => {
            console.log(JSON.stringify(res));
            const symbol = res.data.quotes[0].symbol;
            sessionStorage.setItem("lastCheckedStockSymbol", symbol)
            this.setState({symbol: symbol}, async () => {
                // const symbol = this.state.symbol;
                this.populateChartDataForLastYear();
                this.getQuote();
                // this.populateChartDataForLast24h();
            })
        }).catch(err => {
            console.log(err);
        })
    }

    populateChartDataForLastYear() {
        YahooFinancial.get(GET_CHART_URL, {
            params: {
                "interval": "1d",
                "symbol": this.state.symbol,
                "range": "1y",
                "region": "US"
            }
        }).then((res) => {
            const data = this.getChartDataFromResponse(res);
            this.setState({data: data});
        }).catch(err => {
            console.log(err);
        })
    }

    populateDataForLast24h() {
        YahooFinancial.get(GET_CHART_URL, {
            params: {
                "interval": "1h",
                "symbol": this.state.symbol,
                "range": "1d",
                "region": "US"
            }
        }).then((res) => {
            const data = this.getChartDataFromResponse(res);
            this.setState({data: data});
        }).catch(err => {
            console.log(err);
        })
    }

    getQuote() {
        console.log("Starting to get quote");
        YahooFinancial.get(GET_QUOTE_URL, {
            params: {
                "region": "US",
                "symbols": this.state.symbol
            }
        }).then((res) => {
            console.log("Quote: ")
            // console.log(JSON.stringify(res));
            const postMarketPrice = res.data.quoteResponse.result[0].postMarketPrice;
            const regularMarketPrice = res.data.quoteResponse.result[0].regularMarketPrice;
            const longName = res.data.quoteResponse.result[0].longName;


            this.setState({postMarketPrice: postMarketPrice});
            this.setState({regularMarketPrice: regularMarketPrice});
            this.setState({longName: longName});
        }).catch(err => {
            console.log(err)
        })
    }


    getChartDataFromResponse = (response) => {
        let data = [];
        let timestamps = response.data.chart.result[0].timestamp;
        let closePrices = response.data.chart.result[0].indicators.quote[0].close;
        for (let i = 0; i < timestamps.length; i++) {
            data.push([timestamps[i] * 1000, closePrices[i]]);
        }
        return data;
    }

    tradeFormSubmitcallback = ()=>{
        // get portfolio and balance
        window.location.reload(false);
    }

    onTradeFormSubmit = (symbol, unitCost, tradeType, quantity)=>{
        console.log("Submitted order: ")
        console.log(symbol);
        console.log(tradeType);
        console.log(quantity);

        // call trade function
        trade(this.props.userId, symbol, tradeType, quantity, unitCost, this.tradeFormSubmitcallback);
        // close the form
        this.setState({showTradeModal: false});
    }

    render() {
        let tradeButton;
        let tradeModal;
        console.log("After search, stock symbol is: " + this.state.symbol);

        if (this.props.isUserLogin) {
            tradeButton = (
                <ButtonToolbar> <Button variant="primary" bg="dark" onClick={() => this.setState({showTradeModal: true})}>
                    Trade
                </Button></ButtonToolbar>
            );
            console.log("Show trade modal? " + this.state.showTradeModal);

            tradeModal = <TradeModal symbol={this.state.symbol} unitCost={this.state.regularMarketPrice} show={this.state.showTradeModal} onHide={()=>this.setState({ showTradeModal: false })}
                                     onTradeFormSubmit={this.onTradeFormSubmit}/>
        }


        return (
            <div className="stock-chart-with-searchbar">
                <SearchBar onSubmit={this.OnSearchSubmit} placeholder="Enter company name or stock symbol"/>

                <div>
                    <span className="right" style={{float: "right"}}>
                        {tradeButton}
                    </span>
                </div>
                <AnimatedStockPrice className="animated-stock-price" value={this.state.regularMarketPrice}
                                    longName={this.state.longName}/>
                {tradeModal}

                <Chart data={this.state.data} symbol={this.state.symbol} longName={this.state.longName}
                       regularMarketPrice={this.state.regularMarketPrice}/>
            </div>
        )
    }
}
