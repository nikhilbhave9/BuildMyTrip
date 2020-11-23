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
            metaData: [{
                "hotelName": "Four Seasons",
                "hotelImage": "https://gommts3.mmtcdn.com/htl-imgs/htl-imgs/4190725563799612-20090w000000k89it0142_R_550_412_R5.jpg?&output-quality=75&downsize=910:612&crop=910:612;141,0&output-format=jpg",
                "hotelCost": "50000",
                "hotelLocation": "Marina Bay Sands, Singapore",
                "id": "ID",
                "date": new Date(), 
                "vacancy": 255
            }]
        }
    }

    /*componentWillMount() {
        axios.get('http://localhost:5000/users/profile')
            .then(res => {
                this.setState(res.data);
                this.setState({ 
                    username: res.data.email,
                    name: res.data.name
                }) ;
                console.log(this.state); 


            })
            .catch(err => console.log(err)); 
    }*/

    render() {
        if (this.state.redirect)
            return <Redirect to='/users/profile' />

        return (
            <div>
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
                                            <img className="booking_image" src={value.hotelImage} alt="hotelsnap" />
                                        </td>
                                        <td className="nameloc_cell">
                                            <p className="hotel-name">{value.hotelName}</p>
                                            <p className="hotel_location">{value.hotelLocation}</p>
                                            <p></p>
                                        </td>
                                        
                                        <td className="vacancycheck-cell">
                                            <strong>Currently tracking for: </strong>{(value.date).toString()}<br/><br/>
                                            <strong>Vacancies: </strong>{value.vacancy}
                                        </td>   

                                        <td className="rebook_cell">
                                            <Link to={"/quickbook/" + value.id}>
                                                <Button size="large" style={{ marginLeft: "5px", color: 'white', background: "linear-gradient(45deg, #eb34b1 30%, #3734eb 90%)" }}>
                                                    Quick Book
                                                </Button>
                                            </Link>
                                            <Link to="#">
                                                <Button size="large" style={{ padding: '10px', marginLeft: "20px", fontSize: '20px', color: 'white', background: "linear-gradient(45deg, #eb34b1 30%, #3734eb 90%)" }}>
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






