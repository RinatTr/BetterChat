const axios = require('axios');

// API calls:
// Messages
export const getAllMessages = () => { 
    return axios.get('/api/messages') 
};
export const createMessage = (req_body) => {
    return axios.post('/api/messages', req_body)
};
// Users
export const getAllUsers = () => {
    return axios.get('/api/users')
};
export const createUser = (username) => {
    return axios.post(`/api/users/${username}`) //returns new ID
};
