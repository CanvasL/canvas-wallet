import axios from 'axios';

const http = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/',
    timeout: 5000
})

http.interceptors.response.use((response: any) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
})

export { http };