import React from 'react';
import TimeAgo from 'react-timeago';
import '../css/Message.css';

const Message = ({body, username, timestamp}) => {
    let avatar_url = `https://i.pravatar.cc/50?u=${username}`
    return  (<li>
                <div className="post-container">
                    <div className="avatar-container">
                        <img alt="avatar" src={avatar_url}/>  
                    </div>
                    <div className="body-container">
                        <div className="info-container">
                            <span>@{username}</span>
                            <span><TimeAgo date={timestamp}/></span>
                        </div>
                        <div className="msg-container">
                            <p>{body}</p>
                        </div>
                    </div>       
                </div>
            </li>
            )
}

export default Message;