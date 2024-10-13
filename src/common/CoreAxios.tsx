import axios from 'axios';

const API_URL = 'http://localhost:5072/api';

const getAuthToken = () => {
    return localStorage.getItem('token');
};

const baseAxios = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const authAxios = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

authAxios.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export { baseAxios, authAxios };
