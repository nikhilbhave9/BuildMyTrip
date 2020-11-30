import React, { Component, useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import '../static/UserBookings.css';

/*import {GoogleLogin} from "react-google-login";*/
/*import emailjs from "emailjs-com";*/


axios.defaults.baseURL = "";
axios.defaults.withCredentials = true;


/*
const responseGoogle = response => {
    console.log(response);
    var GoogleEmail = response.profileObj.email;
    console.log(GoogleEmail);
    var templateParams = {

        email: GoogleEmail
    
    };
    emailjs.send('computer_parts_store', 'template_8z6kz0g', templateParams, 'user_OXQPAUgJAaocvkKl7iVMf')
    .then(function(response) {
       alert("Your email address [" + GoogleEmail + "] has been successfully linked to your account.");
    }, function(error) {
       alert('Ran into an error: ', error);
    });
}*/


export default class UserBookings extends Component {
    constructor(props) {
        super(props);

        this.enableAndEdit = this.enableAndEdit.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

        this.state = {
            formFieldsDisabled: true,
            username: '',
            password: '',
            name: '',
            confirm_password: '',
            redirect: false,
            loading: true, 
            metaData: [{
                
            }]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/profile')
            .then(res => {
                this.setState({metaData: res.data.bookings});
                this.setState({loading: false})
                console.log(this.state.metaData); 
            })
            .catch(err => console.log(err)); 
    }

    enableAndEdit(e) {
        e.preventDefault();
        this.setState({ formFieldsDisabled: false });
    }

    updateProfile(e) {
        e.preventDefault();

        if (this.state.password !== this.state.confirm_password)
            alert("Passwords Do Not Match");
        else {
            let updateInfo = {
                "name": this.state.name,
                "email": this.state.username,
                "password": this.state.password
            }

            axios.post('http://localhost:5000/users/profile', updateInfo)
                .then(res => {
                    alert(res.data);
                    sessionStorage.setItem("username", this.state.name);
                    this.state.redirect = true;

                })
                .catch(err => console.log(err))
        }
    }

    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
        if ((e.target.value).length === 0)
            document.getElementById('password-status').innerText = "Your password must contain at least 6 alphanumeric characters";
        else if ((e.target.value).length <= 6)
            document.getElementById('password-status').innerHTML = "<b>Strength<b>: <span style='color: red'>Very Weak</span> - Not enough characters";
        else if ((/\d/.test(e.target.value)) === false)
            document.getElementById('password-status').innerHTML = "<b>Strength<b>: <span style='color: orange'>Weak</span> - Not numeric characters";
        else
            document.getElementById('password-status').innerHTML = "<b>Strength<b>: <span style='color: yellow'>Strong</span> - That seems good enough";
    }

    onChangeConfirmPassword(e) {
        this.setState({ confirm_password: e.target.value })
        if (e.target.value !== this.state.password)
            document.getElementById('confirmpassword-status').innerHTML = "<span style='color: red'>Passwords Do Not Match!</span>";
        else
            document.getElementById('confirmpassword-status').innerHTML = "<span style='color: yellow'>Passwords Match :) </span>";
    }

    onSignIn(e) {
        this.consolelog(e)
    }

    deleteBooking(e){

        const hotelName = {
            name: e,
        };

        axios.post('http://localhost:5000/users/deletebooking', hotelName)
            .then()
            .catch(err => console.log(err))

        window.location.reload();
    }

    render() {
        if (this.state.redirect)
            return <Redirect to='/users/profile' />

        if (this.state.loading)
            return (<div>Loading...</div>) 

        return (
            <div>
                <div className="register">
                    {/* Logo */}
                    <img
                        style={{
                            position: "fixed",
                            width: "100%",
                            left: "50%",
                            top: "50%",
                            height: "100%",
                            objectFit: "cover",
                            transform: "translate(-50%, -50%)",
                            zIndex: "-1",
                        }}
                        src='https://res.cloudinary.com/duzmuxrsw/image/upload/v1605732408/userprofile-twilight_xza0rj.gif'
                        alt='register-bg'
                    />
                    <div className="register__container" style={{ textAlign: 'center' }}>
                        <h1 style={{ fontFamily: "Satisfy", marginTop: "2.5%", fontSize: "40px", color: '#f0f0f0' }}>

                            <Link to='/userprofile'
                                style={{
                                    display: 'inline-block',
                                    fontSize: "40px",
                                    color: '#ffffff'
                                }}>
                                Your Profile
                            </Link>
                            <Link
                                to='/userbookings'
                                style={{
                                    display: 'inline-block',
                                    fontSize: "40px",
                                    color: '#3734eb',
                                    marginLeft: '1%'
                                }}
                            >
                                Your Bookings
                            </Link>
                        </h1>
                        <table style={{ marginLeft: '150px', color: 'white', width: '80%' }}>
                            {this.state.metaData.map((value, index) => {
                                console.log(value);
                                return (
                                    <tr style={{ backgroundColor: 'rgba(50, 50, 100, 0.5)' }}>
                                        <td className="image_cell">
                                            <img className="booking_image" alt="hotelsnap" />
                                        </td>
                                        <td className="nameloc_cell">
                                            <p className="hotel-name">{value.hotelName}</p>
                                            <p className="hotel_location">{value.hotelLocation}</p>
                                            <p><strong>Booking Processed On: </strong>{(value.bookDate)}</p>
                                        </td>

                                        <td className="cost_cell">
                                            ₹{value.roomCost}
                                        </td>

                                        <td className="rebook_cell">
                                            <Button onClick = {() => {this.deleteBooking(value.hotelName)}} size="large" style={{ marginLeft: "20px", color: 'white', background: "linear-gradient(45deg, #eb34b1 30%, #3734eb 90%)" }}>
                                                Delete booking
                                            </Button>
                                            <Button size="large" style={{ marginTop: "10px", marginLeft: "20px", color: 'white', background: "linear-gradient(45deg, #eb34b1 30%, #3734eb 90%)" }}>
                                                Add to Tracker
                                            </Button>
                                            
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                </div >
                {/*<div class="login">

                    <Link to="/">

                        <img className="login__logo" src="https://res.cloudinary.com/duzmuxrsw/image/upload/v1603088411/APLogo_tf5axm.png" alt="" />

                    </Link>

                    <div className="login__container">
                        <h1>Personal Details</h1>

                        <form onSubmit={this.updateProfile}>

                            <h5>
                                Name
                            </h5>

                            <input type="text" defaultValue={this.state['name']} disabled={(this.state['formFieldsDisabled'])} onChange={this.onChangeName} />
                            <h5>
                                Email
                            </h5>
                            <input type="text" defaultValue={this.state['email']} disabled={(this.state['formFieldsDisabled'])} onChange={this.onChangeUsername} />
                            <h5>
                                Password
                            </h5>
                            <input type="password" placeholder="Leave blank if you do not wish to change" defaultValue="" disabled={(this.state['formFieldsDisabled'])}
                                onChange={this.onChangePassword} />
                            <h5>
                                Confirm Password
                            </h5>
                            <input type="password" defaultValue="" disabled={(this.state['formFieldsDisabled'])} onChange={this.onChangeConfirmPassword} />
                            <button className="login__submit" onClick={this.enableAndEdit}>Edit information</button>
                            <button className="login__submit" type="submit" hidden={this.state['formFieldsDisabled']}>Submit Updated Information</button>
                        </form> */}



                {/*<GoogleLogin className = "login__google"
                        clientId = "741110853489-3h88ghsg0u7qmjsjs6856g132dt9l5nk.apps.googleusercontent.com"
                        onSuccess = {responseGoogle}
                        onFailure = {responseGoogle}
                        />*/}

                {/*</div> 
                </div>*/}
            </div>
        )
    }


}






