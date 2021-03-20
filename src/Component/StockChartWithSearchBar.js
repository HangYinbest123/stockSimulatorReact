import React, {Component} from 'react'
import Chart from "./Chart";
import SearchBar from "./SearchBar";
import YahooFinancial from "../api/YahooFinancial";
import './StockChartWithSearchBar.css'
import AnimatedStockPrice from "./AnimatedStockPrice";


const GET_CHART_URL = "/stock/v2/get-chart";
const GET_QUOTE_URL = "/market/v2/get-quotes";

export default class StockChartWithSearchBar extends Component {
    state = {data: [], symbol: "TSLA", currentQuote: null, postMarketPrice: null, regularMarketPrice: null, longName: null};

    OnSearchSubmit = async (term) => {
        term = term.toUpperCase();
        this.setState({symbol: term}, async ()=>{
            // const symbol = this.state.symbol;
            this.populateChartDataForLastYear();
            this.getQuote();
            // this.populateChartDataForLast24h();
        });
    }
    componentDidMount = async () => {
        this.populateChartDataForLastYear();
        this.getQuote();
        this.interval = setInterval(() => this.getQuote(), 3000);
        // window.addEventListener("focus", () => this.onFocus);
        // window.addEventListener("blur", () => this.onBlur);
    }

    onFocus = ()=>{
        this.interval = setInterval(() => this.getQuote(), 3000);
    }

    onBlur = ()=>{
        clearInterval(this.interval);
    }

    populateChartDataForLastYear(){
        YahooFinancial.get(GET_CHART_URL, {
            params: {
                "interval": "1d",
                "symbol": this.state.symbol,
                "range": "1y",
                "region": "US"}
        }).then((res) =>{
            const data = this.getChartDataFromResponse(res);
            this.setState({data: data});
        }).catch(err => {
            console.log(err);
        })
    }

    populateDataForLast24h(){
        YahooFinancial.get(GET_CHART_URL, {
            params: {
                "interval": "1h",
                "symbol": this.state.symbol,
                "range": "1d",
                "region": "US"}
        }).then((res) =>{
            const data = this.getChartDataFromResponse(res);
            this.setState({data: data});
        }).catch(err => {
            console.log(err);
        })
    }

    getQuote(){
        console.log("Starting to get quote" );
        YahooFinancial.get(GET_QUOTE_URL, {
            params:{
                "region": "US",
                "symbols": this.state.symbol
            }
        }).then((res) => {
            console.log("Quote: ")
            // console.log(JSON.stringify(res));
            const postMarketPrice = res.data.quoteResponse.result[0].postMarketPrice;
            const regularMarketPrice = res.data.quoteResponse.result[0].regularMarketPrice;
            const longName = res.data.quoteResponse.result[0].longName;
            console.log("postMarketPrice");
            console.log(postMarketPrice);
            console.log("regularMarketPrice");
            console.log(regularMarketPrice);

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
        for(let i = 0; i < timestamps.length; i ++){
            data.push([timestamps[i]*1000, closePrices[i]]);
        }
        return data;
    }

    render() {
        return (
            <div className="stock-chart-with-searchbar">
                <SearchBar onSubmit={this.OnSearchSubmit} placeholder="Search"/>
                <AnimatedStockPrice className="animated-stock-price" value={this.state.regularMarketPrice} longName={this.state.longName}/>
                <Chart data={this.state.data} symbol={this.state.symbol} longName={this.state.longName} regularMarketPrice={this.state.regularMarketPrice}/>
            </div>
        )
    }
}
