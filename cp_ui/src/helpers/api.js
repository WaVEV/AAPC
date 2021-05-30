import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ? '/api/' : 'http://127.0.0.1:8000/api/';

const api = axios.create({
    baseURL,
})

export default api;