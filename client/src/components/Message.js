import React from 'react';
import TimeAgo from 'react-timeago';

const Message = ({body, username, timestamp}) => {
    let avatar_url = `https://i.pravatar.cc/50?u=${username}`
    return  <li>
                <img alt="avatar" src={avatar_url}/> {username}: {body}
                <TimeAgo date={timestamp} />
            </li>
}

export default Message;