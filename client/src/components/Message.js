import React from 'react';

const Message = ({key, body, username}) => {
 return <li key={key}>{username}: {body}</li>
}

export default Message;