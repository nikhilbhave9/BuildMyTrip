import React, { Component, useState } from 'react';
import Axios from 'axios';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom"
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import bgLogin from '../static/login-sunset.gif';
import {GoogleLogin} from "react-google-login";
import emailjs from "emailjs-com";
import '../static/register.css'


function LoginPage(){

    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    let history = useHistory();

    const responseGoogle = response => {

        console.log(response);
        var GoogleEmail = response.profileObj.email;
        var firstname = response.profileObj.name;

        console.log(GoogleEmail);

        /*var templateParams = {

            email: GoogleEmail,
            name: firstname
        
        };

        emailjs.send('BuildMyTrip', 'template_8z6kz0g', templateParams, 'user_OXQPAUgJAaocvkKl7iVMf')
        .then(function(response) {
           alert("Your email address [" + GoogleEmail + "] has been successfully linked to your account.");
        }, function(error) {
           alert('Ran into an error: ', error);
        });
        */

        Axios({
            method: "POST",
            data: {
                tokenId: response.tokenId
            },
            credentials: 'include',
            withCredentials: true,
            url: "http://localhost:5000/users/googlelogin",
        }).then((res) => {
            if (res.status === 200) {
                localStorage.setItem("Username", GoogleEmail); 
                history.push("/");

            }
            else
                alert(res.data);
        });

    };


    const onLoginUsername = (e) => {

        setLoginUsername(e.target.value);

    }

    const onLoginPassword = (e) => {

        setLoginPassword(e.target.value);
    }

    const login = () => {

        Axios({
            method: "POST",
            data: {
                username: loginUsername,
                password: loginPassword,
            },
            withCredentials: true,
            url: "http://localhost:5000/users/login",

        }).then((res) => {
            if (res.status === 200) {
                localStorage.setItem("Username", loginUsername); 
                history.push("/");

            }
            else
                alert(res.data);
        });


    }

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

                <FormControl 
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
                    <input
                        required
                        id="outlined-password-input"
                        placeholder="Email Address"
                        variant="outlined"
                        onChange = {onLoginUsername}
                    />
                    <h2>
                        Password
                    </h2>
                    <input
                        id="outlined-password-input"
                        placeholder="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                        onChange = {onLoginPassword}
                    />
                    <Button onClick = {login} size="large" id="submit" type="submit" style={{ marginTop: "10%", color: 'white', background: "linear-gradient(45deg, #3734eb 30%, #eb34b1 90%)" }}>
                        Sign in
                    </Button>

                    <GoogleLogin className = "login__google"
                        clientId = "741110853489-3h88ghsg0u7qmjsjs6856g132dt9l5nk.apps.googleusercontent.com"
                        onSuccess = {responseGoogle}
                        onFailure = {responseGoogle}
                    />
                </FormControl>

                
            </div>
        </div >
    )
}

export default LoginPage;
