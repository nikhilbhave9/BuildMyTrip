import React, { Component, useState } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import '../static/UserTracker.css';
import * as AiIcons from "react-icons/ai";

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


export default class UserTracker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formFieldsDisabled: true,
            username: '',
            password: '',
            name: '',
            confirm_password: '',
            redirect: false,
            loading: true,
            metaData: null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/users/profile')
            .then(res => {
                console.log(res.data.wishlist); 

                let params = {"data": JSON.parse(JSON.stringify(res.data.wishlist))}
                axios.post('http://localhost:5000/hotels/getHotels', params)
                    .then(res_i => {
                        console.log(res_i); 
                        this.setState({metaData: res_i.data}, () => {
                            console.log(this.state.metaData);
                            this.setState({loading: false}); 
                        });
                    })
                    .catch(err => console.log(err)); 
            })
            .catch(err => console.log(err)); 

    }

    deleteBooking(e){

        const trackerID = {
            ID: e,
        };

        axios.post('http://localhost:5000/users/deleteTracker', trackerID)
            .then()
            .catch(err => console.log(err))

        window.location.reload();
    }

    render() {
        if (this.state.redirect)
            return <Redirect to='/users/profile' />

        if (this.state.loading)
            return <div>Loading...</div> 

            return (
            <div>
                <div className="register">
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
                                Your Hotel Tracker
                            </Link>
                        </h1>
                        <table style={{ marginLeft: '150px', color: 'white', width: '80%' }}>
                            {this.state.metaData.map((value, index) => {
                                return (
                                    <tr style={{ backgroundColor: 'rgba(50, 50, 100, 0.5)' }}>
                                        <td className="image_cell">
                                            <img className="booking_image" src={value.imagesLink[0]} alt="hotelsnap" />
                                        </td>
                                        <td className="nameloc_cell">
                                            <p className="hotel-name">{value.itemName}</p>
                                            <p className="hotel_location">{value.location}</p>
                                            <p></p>
                                        </td>
                                        <td>
                                            <p className="hotel-name">Deluxe Rooms: ₹{value.itemCost}/night</p>
                                            <p className="hotel_location">King Deluxe Rooms: ₹{value.itemCost * 2}/night</p>
                                            <p className="hotel_location">Season's Emperor Rooms: ₹{value.itemCost * 3}/night</p> 
                                        </td>
                                        <td className="rebook_cell">
                                            <Link to={"/quickbook/" + value._id}>
                                                <Button size="large" style={{ marginLeft: "5px", color: 'white', background: "linear-gradient(45deg, #eb34b1 30%, #3734eb 90%)" }}>
                                                    Quick Book
                                                </Button>
                                            </Link>
                                            <Link to="#">
                                                <Button onClick = {() => {this.deleteBooking(value._id)}} size="large" style={{ padding: '10px', marginLeft: "20px", fontSize: '20px', color: 'white', background: "linear-gradient(45deg, #eb34b1 30%, #3734eb 90%)" }}>
                                                    <AiIcons.AiFillDelete/>
                                                </Button>
                                            </Link> 
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}






