import React, { Component } from 'react';
import emailjs from 'emailjs-com';

import jsPDF from 'jspdf';
import Button from '@material-ui/core/Button';
import img from '../logo.png'
import { Link } from 'react-router-dom'; 
import '../static/invoiceGenerator.css';

export default function invoiceGenerator() {


    const generateInvoice = () => {
        var invoice = new jsPDF('p', 'pt');
        var image = new Image();
        image.src = '/logo.png';

        console.log(localStorage);

        invoice.addImage(img, "png", 20, 20, 160, 40);

        invoice.setFont('courier');
        invoice.text(225, 100, 'Official Invoice');

        invoice.text(50, 150, "Hotel: " + localStorage.getItem('HotelName'));
        invoice.text(50, 175, localStorage.getItem('HotelLocation'));
        invoice.text(50, 200, "Name: " + localStorage.getItem('BillName'))
        invoice.text(300, 200, "Email: " + localStorage.getItem('BillEmail'))
        invoice.text(50, 250, "Room Tier: ");
        invoice.text(300, 250, localStorage.getItem('RoomTier'));
        invoice.text(50, 275, "Room Cost: ");
        invoice.text(300, 275, localStorage.getItem('RoomCost'));
        invoice.text(50, 300, "Cost with GST: ");
        invoice.text(300, 300, localStorage.getItem('FinalCost'));


        invoice.save("BMT Invoice.pdf");
    }

    return (
        <div className="bookconfirm-main">
            <div className="bookconfirm-message">
                <img
                    src="https://res.cloudinary.com/duzmuxrsw/image/upload/v1606070140/604a0cadf94914c7ee6c6e552e9b4487-curved-check-mark-circle-icon-by-vexels_ccipmj.png"
                    alt="done"
                />
                Your Booking had been processed. You can now download the invoice.
                <Link to='#'> 
                    <Button
                        size="large"
                        id="submit"
                        type="submit"
                        style={{
                            margin: 'auto',
                            marginTop: '2%',
                            color: 'white',
                            background: "linear-gradient(45deg, #3734eb 30%, #eb34b1 90%)"
                        }}
                        onClick={generateInvoice}
                    >
                        Generate Invoice
                    </Button>
                </Link> 
                <Link to='/'>
                    <Button
                        size="large"
                        id="submit"
                        type="submit"
                        style={{
                            margin: 'auto',
                            marginTop: '2%',
                            marginLeft: '2%', 
                            color: 'white',
                            background: "linear-gradient(45deg, #3734eb 30%, #eb34b1 90%)"
                        }}
                    >
                        Go back to the homepage
                    </Button>
                </Link>
            </div>

        </div>
    )
}