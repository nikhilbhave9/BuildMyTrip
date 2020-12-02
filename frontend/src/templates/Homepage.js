import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import '../static/Homepage.css';
import Grid from '@material-ui/core/Grid';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import * as BiIcons from 'react-icons/bi';
import ScrollAnimation from 'react-animate-on-scroll';
import Button from '@material-ui/core/Button';
import bgSg from '../static/sg1.mp4';
import { Link } from 'react-router-dom';


export default function Homepage() {
    const useStyles = makeStyles((theme) => ({

        page1: {
            minHeight: '94.25vh',
            height: '100%',
            overflow: 'hidden'
        },

        paperHome: {
            display: "block",
            overflow: 'hidden',
            "& > *": {
                margin: theme.spacing(5),
                marginTop: theme.spacing(25),
                width: theme.spacing(50),
                height: theme.spacing(28)
            },
            backgroundColor: 'transparent',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        },

        tagline: {
            color: "#ffffff",
            "font-family": "Lato",
            "font-weight": "300",
            "font-size": "300%",
            "vertical-align": "middle",
            display: "inline-block",
            "margin-top": "5%",
            "max-width": "60%"
        },

        page2Text: {
            color: "#ffffff",
            "font-family": "Lato",
            "font-weight": "300",
            "font-size": "300%",
            display: "inline-block",
            "max-width": "60%"
        },

        datePicker: {
            top: "50%"
        }

    }));


    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const classes = useStyles();


    return (
        <div>
            <div className={classes.page1}>
                <video autoPlay loop muted
                    style={{
                        position: "absolute",
                        display: "cover",
                        width: "100%",
                        left: "50%",
                        top: "50%",
                        height: "100%",
                        objectFit: "cover",
                        transform: "translate(-50%, -50%)",
                        zIndex: "-1",
                    }}>
                    <source src={bgSg} type="video/mp4" />
                </video>

                <CssBaseline />
                <ScrollAnimation
                    animateIn="fadeIn"
                    animateOut="fadeOut"><span className={classes.tagline}>The most comprehensive website out there to address your international stay concerns</span>
                </ScrollAnimation>


                <div className="homeFooter">
                    Created by <br></br>
                    <a style={{ marginRight: "5px" }} href="https://github.com/Akshat-Singh">Akshat</a>,
                    <a style={{ marginRight: "5px" }} href="https://github.com/nikhilbhave9">Nikhil</a>,
                    <a style={{ marginRight: "5px" }} href="https://github.com/vibodhnautiyal">Vibodh</a>
                </div>
            </div>
            <div id="page2">
                <div style={{ maxWidth: '20%' }}>
                    <img src='https://res.cloudinary.com/duzmuxrsw/image/upload/v1606678369/sgmap_oaie2g.png' alt="SGMap"
                        style={{
                            position: "absolute",
                            display: "cover",
                            maxWidth: "50%",
                            left: "50%",
                            top: "155%",
                            height: "auto",
                            objectFit: "cover",
                            transform: "translate(-50%, -50%)",
                            zIndex: "2",
                        }}
                    >
                    </img>
                    <Link to='/viewHotels/loc=Queenstown, Singapore' className='marker' id='queenstown'><BiIcons.BiCurrentLocation /><span>Queenstown</span></Link>
                    <Link to='/viewHotels/loc=Marina Bay, Singapore' className='marker' id='marinabay'><BiIcons.BiCurrentLocation /><span>Marina Bay</span></Link>
                    <Link to='/viewHotels/loc=Orchard Road, Singapore' className='marker' id='orchardroad'><BiIcons.BiCurrentLocation /><span>Orchard Road</span></Link>
                    <Link to='/viewHotels/loc=Boon Lay, Singapore' className='marker' id='boonlay'><BiIcons.BiCurrentLocation /><span>Boon Lay</span></Link>

                </div>
                <ScrollAnimation animateIn="fadeIn">
                    <span className={classes.page2Text}>Look for the best stay options in Singapore at the lowest possible costs</span>
                </ScrollAnimation>
            </div>
        </div>
    )
}

