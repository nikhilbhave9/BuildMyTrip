import React, { useEffect } from "react"
import axios from "axios";
import '../static/QuickHotel.css'
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import InvoiceGenerator from '../components/invoiceGenerator';


// components: Name, Price, Rating, Image, Catergory, Number of Reviews, UniqueProductID?

function BookingConfirmation() {

    useEffect(() => {
        const booking = {
            hotelName: localStorage.getItem('HotelName'),
            billingName: localStorage.getItem('BillName'),
            email: localStorage.getItem('BillEmail'),
            roomTier: localStorage.getItem('RoomTier'),
            roomCost: localStorage.getItem('RoomCost'),
        }
        axios.post('http://localhost:5000/users/confirmbooking', booking)
            .then()
            .catch(err => alert(JSON.stringify(err)))
    })


    return (
        <div>
            <div>
                <InvoiceGenerator />
            </div>
        </div >
    )
}

export default BookingConfirmation; 