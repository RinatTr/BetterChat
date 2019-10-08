import React, { Component } from 'react';
import TimeAgo from 'react-timeago';
import '../css/Message.css';

class Message extends Component {
    constructor(props) {
        super(props)
        this.state = { show_timestamp: false }
    }

    handleClick = (e) => {
        // return message id
        let ts = this.state.show_timestamp;

        this.setState({ show_timestamp: !ts})
        // console.log("here",e.target)
    }

    render() {
    let {body, username, msg_timestamp, user_timestamp} = this.props;
    let {show_timestamp} = this.state;
    console.log(user_timestamp, typeof user_timestamp)
        let avatar_url = `https://i.pravatar.cc/50?u=${username}`
        return  (<li>
                    <div className="post-container">
                        <div className="avatar-container">
                            <img alt="avatar" src={avatar_url}/>  
                        </div>
                        <div className="body-container" onClick={this.handleClick}>
                            <div className="info-container">
                                <span>@{username}</span>
                                <span><TimeAgo date={msg_timestamp}/></span>
                            </div>
                            <div className={show_timestamp ? "msg-container-show" : "msg-container"}>
                                {/* ternary to  change classname */}
                                {/* ternary to change content */}
                                <p> {show_timestamp ? user_timestamp : body}</p>
                            </div>
                        </div>       
                    </div>
                </li>
                )
    }
    
}

export default Message;