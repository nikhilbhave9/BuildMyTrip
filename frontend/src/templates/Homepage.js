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

import ScrollAnimation from 'react-animate-on-scroll';
import Button from '@material-ui/core/Button';
import bgSg from '../static/sg1.mp4';


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
    document.getElementsByClassName("sheet-sg").onmouseover = function () {
        document.getElementsByClassName("infoDisp").style.display = "block";
    }

    document.getElementsByClassName("sheet-sg").onmouseover = function () {
        document.getElementsByClassName("infoDisp").style.display = "none";
    }

    
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
                    <a style={{marginRight: "5px"}} href="https://github.com/Akshat-Singh">Akshat</a>, 
                    <a style={{marginRight: "5px"}} href="https://github.com/nikhilbhave9">Nikhil</a>, 
                    <a style={{marginRight: "5px"}} href="https://github.com/vibodhnautiyal">Vibodh</a>
                </div>
            </div>
            <div id="page2">
                <div className={classes.paperHome}>
                    <div 
                        style={{ 
                            backgroundImage: 'url(https://res.cloudinary.com/duzmuxrsw/image/upload/v1606673088/kisspng-flag-of-singapore-map-east-jordan-5b1f14dcb4cf61.6161664615287636127406_yf9c3i.jpg)'
                        }}
                    >
                    </div>
                </div>
                <ScrollAnimation animateIn="fadeIn">
                    <span className={classes.page2Text}>Look for the best stay options in Singapore, Switzerland, and New Zealand</span>
                </ScrollAnimation>
            </div>
            <div id="page3">

                <MuiPickersUtilsProvider class="datePicker" utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="From"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            style={{ top: "250px", backgroundColor: 'rgba(255,255,255,0.75)' }}
                        />
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog"
                            label="To"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            style={{ top: "250px", backgroundColor: 'rgba(255,255,255,0.65)' }}
                        />
                    </Grid>

                </MuiPickersUtilsProvider>

                    <span className={classes.page2Text}>Or explore by tinkering with dates and locations</span>
                </div>

            </div>
    )
}

