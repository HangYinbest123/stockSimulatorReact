import axios from 'axios';

export default axios.create({
    baseURL: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com',
    headers: {
        "x-rapidapi-key": "f38da746f4msh7f2e240c3bf8e90p1faf74jsnd6dcfe95eb41",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "useQueryString": true
    },
});
