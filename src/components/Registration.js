import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {}
        }
    }

    register = () => {
        const {username} = this.state;
        const {password} = this.state;
        let errors = {}
        if (username.length <= 0) {
            errors.username = "Please enter your pseudonym"
        }
        if (password.length <= 0) {
            errors.password = "Please enter your password"
        }
        if (username.length && password.length >= 0) {
            const user = {
                username: this.state.username,
                password: this.state.password
            }
            fetch('http://localhost:4000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    /*this.setState({
                        errors : {
                            errorFromServer : (data.username) ? data.username : "error"
                        }
                    })*/
                    if (data.user) {
                        window.sessionStorage.setItem("username", data.user.username);
                        window.sessionStorage.setItem("userId", data.user._id);
                    }
                })
                .then(() => {
                        this.props.history.push('/login')
                        window.alert("registered successfully, login now")
                    }
                )
                .catch(err => {
                    console.error('Error:', err);
                });
            this.setState({
                errors: {}
            })
        } else {
            this.setState({
                errors: errors
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
                <p className="font-weight-bold text-center mt-3">REGISTER</p>
                <div className="d-flex flex-column w-25 m-auto bg-white border rounded p-3">
                    <input
                        onChange={e => this.handleUsernameInput(e)}
                        value={this.state.username}
                        className="mt-1"
                        placeholder="Pseudonym"/>
                    <span className="text-danger small">{this.state.errors.username}</span>
                    <input
                        onChange={e => this.handlePasswordInput(e)}
                        value={this.state.password}
                        className="mt-1"
                        type="password"
                        placeholder="Password"/>
                    <span className="text-danger small">{this.state.errors.password}</span>
                </div>
                <span className="text-danger small text-center">{this.state.errors.errorFromServer}</span>
                <Link
                    className="mt-3 ml-auto mr-auto btn-dark btn-sm text-decoration-none"
                    to='/register'
                    onClick={this.register}
                >Register</Link>
                <Link
                    className="small text-muted text-center mt-1"
                    to="/login">Login</Link>
            </div>
        );
    }

    componentDidMount() {
        window.sessionStorage.clear()
    }
}

export default withRouter(Registration);