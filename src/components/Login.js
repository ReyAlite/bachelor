import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors : {}
        }
    }

    login = () => {
        const {username} = this.state;
        const {password} = this.state;
        let errors = {}
        if (username.length <= 0) {
            errors.username = "Please enter your pseudonym"
        }
        if (password.length <= 0) {
            errors.password = "Please enter your password"
        }
        if (username.length && password.length > 0) {
            const user = {
                username: this.state.username,
                password: this.state.password
            }
            fetch('http://localhost:4000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    /*this.setState({
                        errors : {
                            errorFromServer : data
                        }
                    })*/
                    window.sessionStorage.setItem("username", data.user.username);
                    window.sessionStorage.setItem("userId", data.user._id);
                })
                .then(() => {
                        this.props.history.push('/board')
                    }
                )
                .catch(err => {
                    console.error('Error:', err);
                });
            this.setState({
                errors : {}
            })
        } else {
            this.setState({
                errors : errors
            })
        }
    }

    handleUsernameInput = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordInput = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div className="d-flex flex-column mt-5">
                <p className="font-weight-bold text-center mt-3">LOGIN</p>
                <div className="d-flex flex-column w-25 m-auto bg-white border rounded p-3">
                    <input
                        onChange={e => this.handleUsernameInput(e)}
                        value={this.state.username}
                        className="mt-1"
                        placeholder="Pseudonym"/>
                    <span className="text-danger small">{this.state.errors.username}</span>
                    <input
                        type="password"
                        onChange={e => this.handlePasswordInput(e)}
                        value={this.state.password}
                        className="mt-1"
                        placeholder="Password"/>
                    <span className="text-danger small">{this.state.errors.password}</span>
                </div>
                <span className="text-danger small text-center">{this.state.errors.errorFromServer}</span>
                <Link
                    className="mt-3 ml-auto mr-auto btn-dark btn-sm text-decoration-none"
                    to='/'
                    onClick={this.login}
                >Login</Link>
                <Link
                    className="small text-muted text-center mt-1"
                    to="/register">Register</Link>
            </div>
        );
    }

    componentDidMount() {
        window.sessionStorage.clear()
    }
}

export default withRouter(Login);