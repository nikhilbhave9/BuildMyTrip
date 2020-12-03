import React, { Component, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

axios.defaults.baseURL = "";


export default class registerPage extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirm_Password = this.onChangeConfirm_Password.bind(this);

        this.state = {
            username: '', password: '', confirm_password: '', redirect: false
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
        if ((e.target.value).length === 0)
            document.getElementById('password-status').innerText="Your password must contain at least 6 alphanumeric characters";
        else if ((e.target.value).length <= 6)
            document.getElementById('password-status').innerHTML="<b>Strength<b>: <span style='color: red'>Very Weak</span> - Not enough characters";
        else if ((/\d/.test(e.target.value)) === false)
            document.getElementById('password-status').innerHTML="<b>Strength<b>: <span style='color: orange'>Weak</span> - Not numeric characters";
        else
            document.getElementById('password-status').innerHTML="<b>Strength<b>: <span style='color: yellow'>Strong</span> - That seems good enough";

    }
    
    onChangeConfirm_Password(e) {
        this.setState({
            confirm_password: e.target.value
        })

        if (e.target.value !== this.state.password) 
            document.getElementById('confirmpassword-status').innerHTML="<span style='color: red'>Passwords Do Not Match!</span>";
        else
            document.getElementById('confirmpassword-status').innerHTML="<span style='color: yellow'>Passwords Match :) </span>";

    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password, 
            confirm_password: this.state.confirm_password
        }

        if (user.confirm_password !== user.password) {
            alert("Passwords do not match!"); 
            return; 
        }

        alert(user.password.length);
        if (user.password.length <= 6 || !(/\d/.test(user.password))) {
            alert("Your Password is susceptible to breach. Increase strength!");
            return; 
        }


        axios({
            method: "post",
            data: {
                username: this.state.username,
                password: this.state.password,
            },
            withCredentials: true,
            url: "http://localhost:5000/users/register",
        }).then((res) => console.log(res));

        this.setState({
            username: this.state.username,
            password: this.state.password, 
            confirm_password: this.state.confirm_password
        })
    }

    render() {
        if (this.state.redirect)
            return <Redirect to='/' />

        return (
            <div className="register">
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
                    src='https://res.cloudinary.com/duzmuxrsw/image/upload/v1605703897/register-moonlight_zlmkbm.gif'
                    alt='register-bg'
                />
                <div className="register__container" style={{ textAlign: 'center' }}>
                    <h1 style={{ fontFamily: "Satisfy", marginTop: "2.5%", fontSize: "40px", color: '#f0f0f0' }}>
                        Register
                    </h1>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
                    </style>

                    <FormControl onSubmit={this.onSubmit}
                        style={{
                            fontFamily: 'Lato', 
                            backgroundColor: 'rgba(50, 50, 100, 0.5)', 
                            width: '30%', 
                            height: '530px', 
                            alignItems: 'center',
                            color: '#f0f0f0'
                        }}>
                        <h2>
                            Username
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
                        <h4 id="password-status">
                            Your password must contain at least 6 alphanumeric characters
                        </h4>
                        <h2>
                            Confirm Password
                        </h2>
                        <TextField
                            id="outlined-password-input"
                            label="Confirm Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            onChange={this.onChangeConfirm_Password}
                        />
                        <h4 id="confirmpassword-status">
                            Your password must contain at least 6 alphanumeric characters
                        </h4>
                        <Button onSubmit = {this.onSubmit} size="large" id="submit" type="submit" style={{ marginTop: "2%", color: 'white', background: "linear-gradient(45deg, #3734eb 30%, #eb34b1 90%)" }}>
                            Register
                        </Button>
                    </FormControl>
                </div>
            </div >
        )
    }
}
