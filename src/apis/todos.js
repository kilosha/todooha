import axios from 'axios';

let AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});

AxiosInstance.interceptors.request.use(config => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    config.headers["Authorization"] = "Bearer " + token;
    return config;
});

export default AxiosInstance;