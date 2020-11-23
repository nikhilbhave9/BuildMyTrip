import React, { Component, useState } from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

function RegisterPage() {

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const register = () => {
        Axios({
            method: "POST",
            data: {
                username: registerUsername,
                password: registerPassword,
            },
            withCredentials: false,
            url: "http://localhost:5000/users/register",

        }).then((res) => console.log(res));
    };

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

                <FormControl
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
                        onChange = {(e) => setRegisterUsername(e.target.value)}
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
                        onChange = {(e) => setRegisterPassword(e.target.value)}
                    />
                    <h2>
                            Confirm Password
                    </h2>
                    <TextField
                        id="outlined-password-input"
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                    />
                    <h4 id="password-status">
                        Your password must contain at least 6 alphanumeric characters
                    </h4>
                    <Button onClick = {register} size="large" id="submit" type="submit" style={{ marginTop: "2%", color: 'white', background: "linear-gradient(45deg, #3734eb 30%, #eb34b1 90%)" }}>
                        Register
                    </Button>
                </FormControl>
            </div>
        </div >

    )
}


export default RegisterPage;