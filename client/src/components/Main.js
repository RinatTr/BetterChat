import React, { Component } from 'react';
import Form from './Form.js';
import Message from './Message.js';
import * as Util from '../util/util.js';

class Main extends Component {
    constructor() {
        super()
        this.state = {
            messages: [],
            username: "",
            avatar: ""
        }
    }
    async componentDidMount() {
        try {
            let { data } = await Util.getAllMessages()
            this.setState({messages: data.messages});
        } catch(e) {
            console.log(e, "could not get messages from server")
        }    
    }

    render() {
        let { messages } = this.state; 
        console.log(messages)
        return (
            <div className="main-container">
                <div className="messages-container">
                    Better Chat
                    {messages.map((msg, i) => {
                        return <Message 
                            key={i}
                            body={msg.body} 
                            username={msg.username}
                            />
                        }) 
                    }
                </div>
                <div className="form-container">

                </div>
            </div>
        )
    }
}

export default Main;