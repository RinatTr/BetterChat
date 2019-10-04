import React, { Component } from 'react';
import Message from './Message.js';
import * as Util from '../util/util.js';
import '../css/Main.css';

class Main extends Component {
    constructor() {
        super()
        this.state = {
            msgs: [],
            username: "",
            user_id: null,
            prompt: "",
            invalid_user: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        Util.updateMessages(this);  
    }
    handleChange = (e) => {
        this.setState({prompt: e.target.value})
    }
    async handleSubmit(e) {
        e.preventDefault();
        let { prompt } = this.state;
        //if no username, set username. else, post message
        if (!this.state.username) {
            let username = prompt;
            if (Util.isValidUsername(username)) {
                Util.updateUser(this, username);
            } else {
                this.setState({invalid_user: true})
            }
            
        } else {
            let msg = { body: prompt,
                        user_id: this.state.user_id };
            Util.updateMessages(this, msg);
        }
    }

    render() {
        let { msgs, prompt, username, invalid_user } = this.state; 
        return (
            <div className="main-container">
                <div className="messages-container">
                    <ul>
                        {msgs.map((msg, i) => {
                            return <Message 
                                key={i}
                                body={msg.body} 
                                username={msg.username}
                                timestamp={msg.created_at}
                                />
                            })}
                    </ul>
                </div>
                <div className="form-container">
                    {invalid_user ? <span className="invalid">username should be no longer than 15 characters</span> : ""}
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