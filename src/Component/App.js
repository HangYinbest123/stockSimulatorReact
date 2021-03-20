import React from "react";
import StockChartWithSearchBar from "./StockChartWithSearchBar";
import Login from "./Login";
import Logout from "./Logout";
import StockCardList from "./StockCardList";
import YahooFinancial from "../api/YahooFinancial";
import '../App.css';

const USER_ID = "userId";
const IS_USER_LOGIN = "isUserLogin";
const GET_QUOTE_URL = "/market/v2/get-quotes";

export default class App extends React.Component {
    state = {isUserLogin: false, userId: "", userStocks: []};
    componentDidMount() {
        this.setState({isUserLogin: sessionStorage.getItem(IS_USER_LOGIN), userId: sessionStorage.getItem(USER_ID)}, ()=>{
            if(this.state.isUserLogin){
                this.getAndDisplayUserBalance();
                this.getUserPortfolio();
            }
        });
    }

    onLoginSuccessfullyChange = (userId)=>{

        sessionStorage.setItem(USER_ID, userId);
        sessionStorage.setItem(IS_USER_LOGIN, true);

        this.setState({userId: userId, isUserLogin: true});
        console.log(sessionStorage.getItem(USER_ID));
        console.log(sessionStorage.getItem(IS_USER_LOGIN));

        this.getAndDisplayUserBalance();
        this.getUserPortfolio();
    }

    getAndDisplayUserBalance(){

    }

    getUserPortfolio = async() => {
        let fakeStockList = [{id:0, symbol: 'bac', costBase: 23.5, quantity: 3}, {id:1, symbol: 'tsla', costBase: 23.5, quantity: 3}];
        this.getQuoteForStocks(fakeStockList);

    }

    // TODO: refactor to get multiple stocks from 1 http request
    getQuoteForStocks(stockList){
        let symbols = this.getSymbolsFromStockList(stockList);
        console.log(symbols);
        YahooFinancial.get(GET_QUOTE_URL, {
            params:{
                "region": "US",
                "symbols": symbols,
            }
        }).then((res) => {
            console.log(res);
            for(let i = 0; i < stockList.length; i ++){
                let stock = stockList[i];
                const regularMarketPrice = res.data.quoteResponse.result[i].regularMarketPrice;
                const longName = res.data.quoteResponse.result[i].longName;
                stock.quote = regularMarketPrice;
                stock.longName = longName;
            }
            this.setState({userStocks: stockList}, ()=>{
                console.log(JSON.stringify(this.state.userStocks));
            });
        }).catch(err => {
            console.log(err);
        })
    }

    getSymbolsFromStockList(stockList){
        if(stockList.length === 0){
            return [];
        }
        let symbols = stockList[0].symbol;
        for(let i = 1; i < stockList.length; i ++){
            symbols += ',' + stockList[i].symbol;
        }
        return symbols;
    }

    render() {
        let button;
        let stockCardList;
        if(this.state.isUserLogin){
            button = <Logout/>;
            stockCardList = <StockCardList stocks={this.state.userStocks}/>;
        }else{
            button = <Login onLoginSuccessfullyChange={this.onLoginSuccessfullyChange}/>;
        }

        return (
            <div className="App">
                {button}
                <div className="flexbox-container">
                    <div className="flex-item-left"><StockChartWithSearchBar/></div>
                    <div className="flex-item-right">{stockCardList}</div>
                </div>
            </div>
        )
    }
}