import axios from 'axios';

const BASE_URL_YAHOO_FINANCE = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com';

const GET_QUOTE_URL = "/market/v2/get-quotes";

export const YahooFinancial = axios.create({
    baseURL: BASE_URL_YAHOO_FINANCE,
    headers: {
        "x-rapidapi-key": "95d6acc078msh9ba6639d0df4657p1a2bacjsna8d880743664",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "useQueryString": true
    },
});


export function getQuoteForStocks(stockList){
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

function getSymbolsFromStockList(stockList){
    if(stockList.length === 0){
        return [];
    }
    let symbols = stockList[0].symbol;
    for(let i = 1; i < stockList.length; i ++){
        symbols += ',' + stockList[i].symbol;
    }
    return symbols;
}
