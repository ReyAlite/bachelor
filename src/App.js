import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Login from "./components/Login"
import Board from "./components/board/Board"
import BoardItem from "./components/board/BoardItem"
import Chat from "./components/chat/Chat"
import Profile from "./components/profile/Profile"
import Registration from './components/Registration';

function App() {
    return (
        <div className="w-75 m-auto">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Board/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Registration/>
                    </Route>
                    <Route path="/board/:id">
                        <BoardItem/>
                    </Route>
                    <Route path="/chat">
                        <Chat/>
                    </Route>
                    <Route path="/profile">
                        <Profile/>
                    </Route>
                </Switch>
            </Router>
        </div>

    );
}

export default App;
