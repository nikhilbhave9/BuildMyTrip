import React, { useEffect } from "react"
import axios from "axios";
import '../static/QuickHotel.css'
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import InvoiceGenerator from '../components/invoiceGenerator';


// components: Name, Price, Rating, Image, Catergory, Number of Reviews, UniqueProductID?

function BookingConfirmation() {

    useEffect(() => {
        alert('Your booking don'); 
    })

    
    return (
        <div>
            <div>
                <InvoiceGenerator/>
            </div>
        </div >
    )
}

export default BookingConfirmation; 