import axios from "axios";

export const apiSpace = axios.create({
    baseURL: "https://space-x-api.onrender.com",
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
});