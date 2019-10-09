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
        compRef.setState({username, user_id, prompt:"", invalid_user: false, non_unique: false})
    } catch(e) {
        console.log(e, "could not update user")
        if (isNonUnique(e)) compRef.setState({non_unique: true, invalid_user: false})
    }
}

// Validation
    // Username
export const isNotLongUsername = (input) => {
    // 15 chars max 
    return input.length <= 15;
}

export const isNonUnique = (e) => {
    // username must be unique. error code for SQL unique constraint validation
    return (e.response.data.error.code === "23505")
}

export const invalidCaseStr = (long, non_unique) => {
    if (long) {
        return "username should be no longer than 15 characters";
    } else {
        return "username already exists";
    }
}
// Format Date
export const formatDate = (ts) => {
    let date = new Date(ts);
    return `${date.toDateString()} ${date.toLocaleTimeString()}`;
}