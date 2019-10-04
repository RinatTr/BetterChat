const axios = require('axios');

// API calls
    // Messages
export const getAllMessages = () => { 
    return axios.get('/api/messages') 
};
export const createMessage = (req_body) => {
    return axios.post('/api/messages', req_body)
};
    //  Users
export const getAllUsers = () => {
    return axios.get('/api/users')
};
export const createUser = (username) => {
    return axios.post(`/api/users/${username}`) //returns new ID
};

// Update Content
    // Update messages
export async function updateMessages(compRef, msg = null) {
    try {
        if (msg) await createMessage(msg); 
        let { data } = await getAllMessages();
        compRef.setState({msgs: data.messages, prompt:""});
    } catch(e) {
        console.log(e, "could not update messages")
    } 
}
    // Create user
export async function updateUser(compRef, username) {
    try {
        let res = await createUser(username);
        let user_id = res.data.data.id;
        compRef.setState({username, user_id, prompt:"", invalid_user: false})
    } catch(e) {
        console.log(e, "could not update user")
    }
}

// Validation
    // Username
export const isValidUsername = (input) => {
    // 15 chars max 
    return input.length <= 15;
}