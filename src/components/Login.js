import React, {Component} from 'react';
import {Link} from "react-router-dom";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            head: "LOGIN",
            spanText: "Register"
        }
    }

    render() {
        return (
            <div className="d-flex flex-column mt-5">
                <p className="font-weight-bold text-center mt-3">{this.state.head}</p>
                <div className="d-flex flex-column w-25 m-auto bg-white border rounded p-3">
                    <input className="mt-1" placeholder="Username"/>
                    <input className="mt-1" placeholder="Password"/>
                </div>
                <Link className="mt-3 ml-auto mr-auto btn-dark btn-sm text-decoration-none"
                      to='/'>{this.state.head}</Link>
                <span
                    className="small text-muted text-center mt-1"
                >{this.state.spanText}</span>
                {/*      //TODO: build register form
                <Link
                    className="small text-muted text-center mt-1"
                    to="/register">Register</Link>*/}
            </div>
        );
    }
}

export default Login;