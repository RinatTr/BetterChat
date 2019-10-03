import React from 'react';

const Message = ({body, username, timestamp}) => {
    let avatar_url = `https://i.pravatar.cc/50?u=${username}`
 return <li>
            <img src={avatar_url}/> {username}: {body}
        </li>
}

export default Message;