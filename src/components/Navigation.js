import React, {Component} from "react";
import {Link} from "react-router-dom";
import "../css/navigation.css"

class Navigation extends Component {
    render() {
        return (
            <div className="ml-auto mt-5 navigation">
                <Link to="/">Board</Link>
                <Link to="/chat">Chat</Link>
                <Link to="/login">Logout</Link>
            </div>
        );
    }
}

export default Navigation;