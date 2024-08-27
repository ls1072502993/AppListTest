import axios from 'axios';
import { baseUrl } from './config.js'

const instance = axios.create({
    baseURL: baseUrl,
    timeout: 8000,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance