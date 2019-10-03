import React from 'react';

const Message = ({body, username}) => {
 return <li>{username}: {body}</li>
}

export default Message;