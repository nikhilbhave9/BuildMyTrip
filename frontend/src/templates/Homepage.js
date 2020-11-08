import React, { Component } from 'react';
import {makeStyles} from '@material-ui/core/styles';  
import { CssBaseline } from '@material-ui/core'; 
import '../static/Homepage.css';
import {Link} from "react-router-dom";

import ScrollAnimation from 'react-animate-on-scroll'; 

const useStyles = makeStyles((theme) => ({
    
    root: {
        minHeight: '100vh', 
        backgroundImage: 'url(https://res.cloudinary.com/duzmuxrsw/image/upload/v1604079881/364222_yidan0.jpg)', 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        "text-align": "center"
    }, 

    paperHome: {
        display: "flex",
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
        "font-family": "Noto Sans",
        "font-size": "300%",
        "vertical-align": "middle",
        display: "inline-block",
        "margin-top": "5%",
        "max-width": "60%"
    },
    
    page2Text: {
        color: "#ffffff", 
        "font-family": "Noto Sans",
        "font-size": "300%",
        display: "inline-block",
        "max-width": "60%"
    },
})); 


export default function Homepage() {    
    const classes = useStyles(); 
    document.getElementsByClassName("sheet-sg").onmouseover = function() {
        document.getElementsByClassName("infoDisp").style.display = "block";
    }

    document.getElementsByClassName("sheet-sg").onmouseover = function() {
        document.getElementsByClassName("infoDisp").style.display = "none";
    }
    return(
        <div>
        <div className={classes.root}>
            <CssBaseline/>
            <ScrollAnimation
                animateIn="fadeIn"
                animateOut="fadeOut"><span className={classes.tagline}>The most comprehensive website out there to alleviate your international stay concerns</span>
            </ScrollAnimation>
        </div> 
            <div id="page2">
                <div className={classes.paperHome}>
                    <button className="sheet-sg">
                        <a href="/viewHotels/Singapore"> Singapore </a>
                    </button>

                    <button className="sheet-sw"> 
                        <a href="/viewHotels/Switzerland"> Switzerland </a>
                    </button> 

                    <button className="sheet-nz">
                        <a href="/viewHotels/NewZealand"> New Zealand </a>
                    </button> 
                </div>  
                <ScrollAnimation animateIn="fadeIn">
                    <span className={classes.page2Text}>Look for the best stay options in Singapore, Switzerland, and New Zealand</span>
                </ScrollAnimation>
            </div>
        </div> 
    )
}