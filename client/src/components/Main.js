import React, { Component } from 'react';
import Form from './Form.js';
import Message from './Message.js';
class Main extends Component {
    constructor() {
        super()
        this.state = {}
    }
    componentDidMount() {

    }

    render() {
        return(
            <div className="main-container">
                <div className="messages-container">

                </div>
                <div className="form-container">

                </div>
            </div>
        )
    }
}

export default Main;