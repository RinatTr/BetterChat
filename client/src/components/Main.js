import React, { Component } from 'react';
import Message from './Message.js';
import * as Util from '../util/util.js';
import '../css/Main.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";
const client = new W3CWebSocket('ws://localhost:8000');

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msgs: [],
            username: "",
            user_id: null,
            prompt: "",
            invalid_user: false,
            non_unique: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };
        client.onmessage = (msg) => {
            setTimeout(function() { Util.updateMessages(this) }.bind(this), 1000)
            if (typeof msg.data === 'string') {
                let parsed = JSON.parse(msg.data);
                console.log("Received: '" + msg.data.prompt + "'");
            }
        };
        Util.updateMessages(this);  
    }

    handleChange = (e) => {
        this.setState({prompt: e.target.value})
    }
    async handleSubmit(e) {
        e.preventDefault();
        let { prompt, username, user_id } = this.state;
        //if no username, set username. else, post message
        if (!this.state.username) {
            let username = prompt;
            if (Util.isNotLongUsername(username)) {
                Util.updateUser(this, username);
            } else {
                this.setState({invalid_user: true})
            }            
        } else {
            let msg = { body: prompt,
                user_id };
                console.log({prompt, username})
            client.send(JSON.stringify({prompt, username}));
            Util.updateMessages(this, msg); 
        }
    }

    render() {
        let { msgs, prompt, username, invalid_user, non_unique } = this.state; 
        return (
            <div className="main-container">
                <div className="messages-container">
                    <ul>
                        {msgs.map((msg, i) => {
                            return <Message 
                                key={i}
                                body={msg.body} 
                                username={msg.username}
                                msg_timestamp={msg.created_at}
                                user_timestamp={msg.user_created_at}
                                />
                            })}
                    </ul>
                </div>
                <div className="form-container">
                    {invalid_user || non_unique ? <span className="invalid">{Util.invalidCaseStr(invalid_user, non_unique)}</span> : ""}
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            name="prompt" 
                            onChange={this.handleChange} 
                            value={prompt} 
                            placeholder={username ? "what's happening?" : "Enter a username"}
                        />
                        <button type="submit"><i className="material-icons">{username ? "send" : "account_circle"}</i></button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Main;