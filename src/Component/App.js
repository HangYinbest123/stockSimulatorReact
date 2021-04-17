import React from "react";
import StockChartWithSearchBar from "./StockChartWithSearchBar";
import Login from "./Login";
import StockCardList from "./StockCardList";
import {YahooFinancial} from "../api/YahooFinancial";
import {
    getUserByThirdPartyId,
    enrollUser,
    getUserPortfolio,
    getUserBalance, addUserBalance
} from "../api/StockSimulator";
import '../App.css';
import BalanceCard from "./BalanceCard";
import TotalAssetCard from "./TotalAssetCard";

import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "./Navbar";
import SignInModal from "./SignInModal";
import FundAlert from "./FundRecivedModal";
import FundReceivedModal from "./FundRecivedModal";

const THIRD_PARTY_USER_ID = "thirdPartyUserId";
const USER_ID = "userId";
const IS_USER_LOGIN = "isUserLogin";
const GET_QUOTE_URL = "/market/v2/get-quotes";
const FIRST_NAME = "firstName";
const LAST_NAME = "lastName";

export default class App extends React.Component {
    state = {
        isUserLogin: false,
        userId: "",
        userStocks: [],
        THIRD_PARTY_USER_ID: "",
        userBalance: 0,
        showTradeModal: false,
        directDeposit: 0,
        showSignInModal: false,
        showFundReceivedModal: false
    };

    componentDidMount() {
        console.log("After refresh: ");
        console.log(IS_USER_LOGIN + ": " + sessionStorage.getItem(IS_USER_LOGIN));
        console.log(USER_ID + ": " + sessionStorage.getItem(USER_ID));
        if (sessionStorage.getItem(IS_USER_LOGIN) === "true" && sessionStorage.getItem(USER_ID) !== "" && sessionStorage.getItem(USER_ID) !== null) {
            this.setState({
                isUserLogin: sessionStorage.getItem(IS_USER_LOGIN),
                userId: sessionStorage.getItem(USER_ID)
            }, () => {

                console.log("userId after refresh: " + this.state.userId);

                getUserPortfolio(this.state.userId, this.getUserPortfolioCallback);
                getUserBalance(this.state.userId, this.getUserBalanceCallback);

            });
        }
    }

    onLoginSuccessfullyChange = async (googleUser) => {
        let thirdPartyUserId = googleUser.getBasicProfile().getId();
        // let firstName = googleUser.getBasicProfile().getGivenName();
        // let lastName = googleUser.getBasicProfile().getFamilyName();
        this.setState({showSignInModal: false});
        sessionStorage.setItem(THIRD_PARTY_USER_ID, thirdPartyUserId);
        sessionStorage.setItem(IS_USER_LOGIN, true);

        this.setState({THIRD_PARTY_USER_ID: thirdPartyUserId, isUserLogin: true});

        enrollUser(googleUser, this.enrollUserCallback);
        // has to await here

        getUserByThirdPartyId(googleUser, this.getUserByThirdPartyIdCallback);
    }

    onLogoutSuscessfullyChange = async (logoutResponse) => {
        console.log("Logout response: " + logoutResponse);

        sessionStorage.clear();

        this.setState({THIRD_PARTY_USER_ID: null, isUserLogin: false});
    }

    // Store user info and call get user portfolio, get user balance
    getUserByThirdPartyIdCallback = (userResponse) => {
        console.log(JSON.stringify(userResponse));
        const userId = userResponse.data["userId"];
        if (!userId || userId === "") {
            throw 'failed to retrieve user id!';
        } else {
            sessionStorage.setItem(USER_ID, userId);
            console.log("do we have USER_ID stored in session? : " + sessionStorage.getItem(USER_ID));
            this.setState({userId: userResponse.data["userId"]}, () => {
                console.log("Successfully retrieved userId: " + this.state.userId);
                getUserPortfolio(userId, this.getUserPortfolioCallback);
                getUserBalance(userId, this.getUserBalanceCallback);
            });
        }
    }

    getUserBalanceCallback = (userBalanceResponse) => {
        let balance = userBalanceResponse.data["balance"];
        this.setState({userBalance: balance});
        let directDeposit = userBalanceResponse.data["directDeposit"];
        this.setState({directDeposit: directDeposit});
    }


    enrollUserCallback = (enrollUserResponse) => {
        if (enrollUserResponse.data === null || enrollUserResponse.data === "") {
            console.log("User has already been enrolled");
        } else {
            let userId = enrollUserResponse.data;
            console.log("UserId: " + userId)
            sessionStorage.setItem(USER_ID, userId);
            this.setState({userId: userId});
            addUserBalance(userId, 10000, this.addUserBalanceCallback);
        }
    }

    addUserBalanceCallback = () => {
        getUserBalance(this.state.userId, this.getUserBalanceCallback);
        this.setState({showFundReceivedModal: true});
    }

    // getUserPortfolio = async() => {
    //     getUserPortfolio(this.state.userId, this.getUserPortfolioCallback);
    // }

    getUserPortfolioCallback = (userOwnedStocksResponse) => {
        this.getQuoteForStocks(userOwnedStocksResponse.data);
    }

    getQuoteForStocks(stockList) {
        let symbols = this.getSymbolsFromStockList(stockList);
        console.log(symbols);
        YahooFinancial.get(GET_QUOTE_URL, {
            params: {
                "region": "US",
                "symbols": symbols,
            }
        }).then((res) => {
            console.log(res);
            for (let i = 0; i < stockList.length; i++) {
                let stock = stockList[i];
                const regularMarketPrice = res.data.quoteResponse.result[i].regularMarketPrice;
                const longName = res.data.quoteResponse.result[i].longName;
                stock.quote = regularMarketPrice;
                stock.longName = longName;
            }
            this.setState({userStocks: stockList}, () => {
                console.log(JSON.stringify(this.state.userStocks));
            });
        }).catch(err => {
            console.log(err);
        })
    }

    getSymbolsFromStockList(stockList) {
        if (stockList.length === 0) {
            return [];
        }
        let symbols = stockList[0].symbol;
        for (let i = 1; i < stockList.length; i++) {
            symbols += ',' + stockList[i].symbol;
        }
        return symbols;
    }

    getTotalAssetValue = () => {
        let userBalance = this.state.userBalance;
        let stocksTotalValue = 0;
        if (this.state.userStocks.length === 0) {
            return userBalance;
        }
        for (let userStock of this.state.userStocks) {
            console.log(JSON.stringify(userStock))
            stocksTotalValue += userStock.quantity * userStock.quote;
        }
        console.log("Total asset value: " + stocksTotalValue + userBalance);
        return stocksTotalValue + userBalance;
    }


    render() {
        let loginButton;
        let stockCardList;
        let balanceCard;
        let totalAssetCard;

        if (this.state.isUserLogin) {

            stockCardList = <StockCardList stocks={this.state.userStocks}/>;
            balanceCard = (<div className="flexbox-container">
                <div className="flex-item-left"/>
                <div className="flex-item-mid">
                    <BalanceCard balance={this.state.userBalance}/>
                </div>
                <div className="flex-item-right"/>
            </div>);

            totalAssetCard = (<div className="flexbox-container">
                <div className="flex-item-left"/>
                <div className="flex-item-mid">
                    <TotalAssetCard value={this.getTotalAssetValue()} directDeposit={this.state.directDeposit}/>
                </div>
                <div className="flex-item-right"/>
            </div>);

        } else {
            loginButton = <Login onLoginSuccessfullyChange={this.onLoginSuccessfullyChange}/>;
        }


        return (
            <div className="App">
                <FundReceivedModal show={this.state.showFundReceivedModal} onHide={() => this.setState({showFundReceivedModal: false})}/>
                <NavBar isUserLogin={this.state.isUserLogin}
                        onLogoutSuccessfullyChange={this.onLogoutSuscessfullyChange}
                        onShowLoginModal={() => this.setState({showSignInModal: true})}
                        onHideLoginModal={() => this.setState({showSignInModal: false})}></NavBar>
                <SignInModal show={this.state.showSignInModal} onHide={() => this.setState({showSignInModal: false})}
                             onLoginSuccessfullyChange={this.onLoginSuccessfullyChange}/>
                <div className="flexbox-container">
                    <div className="flex-item-left"></div>
                    <div className="flex-item-mid"><StockChartWithSearchBar isUserLogin={this.state.isUserLogin}
                                                                            userId={this.state.userId}/></div>
                    <div className="flex-item-right">{stockCardList}</div>
                </div>
                {totalAssetCard}
                {balanceCard}

            </div>
        )
    }
}