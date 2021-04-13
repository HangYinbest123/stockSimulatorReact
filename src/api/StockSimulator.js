import axios from "axios";

// const BASE_URL_STOCK_SIMULATOR = 'http://localhost:8080';
const BASE_URL_STOCK_SIMULATOR = 'https://stock-simulator-306919.uc.r.appspot.com';

export const stockSimulatorAPI = axios.create({
    baseURL: BASE_URL_STOCK_SIMULATOR,
    headers: {
        "Content-Type": "application/json"
    }
});

export function getUserByThirdPartyId(googleUser, callback) {
    stockSimulatorAPI.get(
        '/user/thirdPartyId/' + googleUser.getBasicProfile().getId(),
    ).then((res) => callback(res));
}

export let enrollUser = (googleUser, callback) => {
    console.log("Starting to enroll user ...")
    stockSimulatorAPI.post(
        '/user/enroll/thirdParty', {
            "thirdPartyId": googleUser.getBasicProfile().getId(),
            "firstName": googleUser.getBasicProfile().getGivenName(),
            "lastName": googleUser.getBasicProfile().getFamilyName()
        }
    ).then(res => callback(res));
}

export let getUserBalance = (userId, callback) => {
    stockSimulatorAPI.get(
        '/user/' + userId + '/balance'
    ).then(res => callback(res));
}

export let addUserBalance = (userId, amount, callback) => {
    stockSimulatorAPI.put(
        '/user/' + userId + '/balance', {"amount": amount}
    ).then(res => callback(res));
}

export let getUserPortfolio = (userId, callback) => {
    stockSimulatorAPI.get(
        '/user/' + userId + '/portfolio'
    ).then(res => callback(res));
}

export let trade = (userId, symbol, tradeType, quantity, unitCost, callback) =>{
    stockSimulatorAPI.post(
        '/user/' + userId + '/trade',{
            "tradeType": tradeType,
            "quantity": quantity,
            "unitCost": unitCost,
            "symbol": symbol
        }
    ).then(res => callback(res));
}