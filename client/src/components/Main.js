import React, { Component } from 'react';
import Message from './Message.js';
import * as Util from '../util/util.js';

class Main extends Component {
    constructor() {
        super()
        this.state = {
            msgs: [],
            username: "",
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
        //if no username, set username. else, post message
        if (!this.state.username) {
            Util.createUser(e.target.value);
        } else {
            
        }
    }

    render() {
        let { msgs, prompt, username } = this.state; 
        return (
            <div className="main-container">
                <div className="messages-container">
                    Better Chat
                    {msgs.map((msg, i) => {
                        return <Message 
                            key={i}
                            body={msg.body} 
                            username={msg.username}
                            timestamp={msg.created_at}
                            />
                        }) 
                    }
                </div>
                <div className="form-container">
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            name="prompt" 
                            onChange={this.handleChange} 
                            value={prompt} 
                            placeholder={username ? "type message" : "enter username"}/>
                        <button type="submit">click</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Main;