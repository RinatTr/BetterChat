import React, { Component } from 'react';
import Message from './Message.js';
import * as Util from '../util/util.js';

class Main extends Component {
    constructor() {
        super()
        this.state = {
            msgs: [],
            username: "",
            user_id: null,
            prompt: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {
        try {
            let { data } = await Util.getAllMessages()
            this.setState({msgs: data.messages});
        } catch(e) {
            console.log(e, "could not get messages from server")
        }    
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
            let res = await Util.createUser(username);
            let user_id = res.data.data.id;
            this.setState({username, user_id, prompt:""})
        } else {
            let msg = { body: prompt,
                        user_id: this.state.user_id };
            try {
                await Util.createMessage(msg);
                let { data } = await Util.getAllMessages();
                this.setState({msgs: data.messages, prompt:""});
            } catch(e) {
                console.log(e, "could not create or get messages from server")
            }  
        }
    }

    render() {
        let { msgs, prompt, username } = this.state; 
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
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            name="prompt" 
                            onChange={this.handleChange} 
                            value={prompt} 
                            placeholder={username ? "type message" : "enter username"}
                        />
                        <button type="submit">click</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Main;