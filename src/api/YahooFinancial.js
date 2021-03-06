import axios from 'axios';

export default axios.create({
    baseURL: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com',
    headers: {
        "x-rapidapi-key": "95d6acc078msh9ba6639d0df4657p1a2bacjsna8d880743664",
        "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        "useQueryString": true
    },
});
