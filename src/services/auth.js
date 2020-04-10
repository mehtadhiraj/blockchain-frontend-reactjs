import axios from 'axios';

export const setHeader = function(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return true;
}

export const setToken = function(token){
    localStorage.setItem('jwtToken', token);
}

export const API_URL = "http://192.168.99.102:3001/"

