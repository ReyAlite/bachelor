import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Login from "./components/Login"
import Board from "./components/board/Board"
import Chat from "./components/chat/Chat"
import Registration from './components/Registration';

function App() {
    return (
        <div className="w-75 m-auto">
            <Router>
                <Switch>
                    <Route exact path={["/", "/login"]} component={Login}/>
                    <Route path="/register" component={Registration}/>
                    <Route path="/board" component={Board}/>
                    <Route path="/chat" component={Chat}/>
                </Switch>
            </Router>
        </div>

    );
}

export default App;
