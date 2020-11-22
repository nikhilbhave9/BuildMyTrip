import React from "react"
import axios from "axios";
import '../static/QuickHotel.css'
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import InvoiceGenerator from '../components/invoiceGenerator';


// components: Name, Price, Rating, Image, Catergory, Number of Reviews, UniqueProductID?

function BookingConfirmation() {

    /*
    function Wishlist(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/wishlist/add/' + id)  
            .then(res => {
                alert(JSON.stringify(res.data));  
            })
            .catch(err => alert(JSON.stringify(err))); 
    } */

    
    console.log(localStorage); 
    return (
        <div>
            <div>
                <InvoiceGenerator/>
            </div>
        </div >
    )
}

export default BookingConfirmation; 