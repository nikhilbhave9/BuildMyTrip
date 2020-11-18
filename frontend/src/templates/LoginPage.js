import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import bgLogin from '../static/login-sunset.gif';

axios.defaults.baseURL = "";


export default class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: '', password: '', redirect: false
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.username,
            password: this.state.password
        }

        console.log(user);

        axios.post('http://localhost:5000/users/login', user)
            .then(res => {
                sessionStorage.setItem("username", res.data.name);
                axios.get('http://localhost:5000/users/cart')
                    .then(res => {
                        sessionStorage.setItem("cartLength", res.data.length);
                    });

                this.setState({ redirect: true });
            });

        this.setState({
            username: this.state.username,
            password: this.state.password
        })
    }

    render() {
        if (this.state.redirect)
            return <Redirect to='/' />

        return (
            <div className="login">
                {/* Logo */}
                <img
                    style={{
                        position: "absolute",
                        width: "100%",
                        left: "50%",
                        top: "50%",
                        height: "100%",
                        objectFit: "cover",
                        transform: "translate(-50%, -50%)",
                        zIndex: "-1",
                    }}
                    src='https://res.cloudinary.com/duzmuxrsw/image/upload/v1605645521/login-sunset_rjy72r.gif'
                    alt='login-bg'
                />
                <div className="login__container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontFamily: "Satisfy", marginTop: "2.5%", fontSize: "40px" }}>
                        Sign in
                    </h1>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
                    </style>

                    <FormControl onSubmit={this.onSubmit}
                        style={{
                            fontFamily: 'Lato', 
                            backgroundColor: 'rgba(120, 50, 120, 0.5)', 
                            width: '30%', 
                            height: '450px', 
                            alignItems: 'center',
                        }}>
                        <h2>
                            Email
                        </h2>
                        <TextField
                            required
                            id="outlined-required"
                            label="Username: Required"
                            variant="outlined"
                            onChange={this.onChangeUsername}
                        />
                        <h2>
                            Password
                        </h2>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            onChange={this.onChangePassword}
                        />
                        <Button size="large" id="submit" type="submit" style={{ marginTop: "10%", color: 'white', background: "linear-gradient(45deg, #3734eb 30%, #eb34b1 90%)" }}>
                            Sign in
                        </Button>
                    </FormControl>
                </div>
            </div >
        )
    }
}
