import React, {Component} from 'react';
import Navigation from '../Navigation';
import Header from '../Header';

class Chat extends Component {
    render() {
        return (
            <div className="d-flex flex-column" >
                <Header name="Chat"/>
                <p>Chat</p>
            </div>
        );
    }
}

export default Chat;