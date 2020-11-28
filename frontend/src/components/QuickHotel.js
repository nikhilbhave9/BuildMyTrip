import React, { useEffect } from "react"
import '../static/QuickHotel.css'
import Button from '@material-ui/core/Button';
import 'date-fns';
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import { Link } from 'react-router-dom';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';


// components: Name, Price, Rating, Image, Catergory, Number of Reviews, UniqueProductID?

function QuickHotel({ name, costPerNight, id, location }) {

    /*function Wishlist(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/wishlist/add/' + id)  
            .then(res => {
                alert(JSON.stringify(res.data));  
            })
            .catch(err => alert(JSON.stringify(err))); 
    } */

    const [finalCost, setFinalCost] = React.useState(costPerNight);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [checkOutDate, setCheckOutDate] = React.useState(new Date().setDate(selectedDate.getDate() + 1));
    const [roomPreferences, setRoomPreferences] = React.useState(1);
    const [roomPrefButtonColor, setRoomPrefButtonColor] = React.useState('rgba(75, 75, 150, 0.4)')
    const [billName, setName] = React.useState('')
    const [billEmail, setEmail] = React.useState('')

    let baseCost = costPerNight
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    let roomArray1 = [], roomArray2 = [];
    for (let i = 1; i <= 15; i++) {
        roomArray1[i] = i;
        roomArray2[i + 15] = i + 15;
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleDateChanger = (date) => {
        setCheckOutDate(date);
        /* Make an axios request to fetch the vacancies on this date */
    };

    const getCostEstimate = () => {
        let newCost = baseCost * Math.floor((Math.abs(checkOutDate - selectedDate) / 1000) / 86400) * roomPreferences;

        newCost = newCost + (Number(document.getElementById('cab-addon').checked) +
            Number(document.getElementById('xtrabed-addon').checked) +
            Number(document.getElementById('xlbed-addon').checked)) * 2000;

        let invoice = "<tr><td className='price-component'>Room Tier: </td><td>" + roomPreferences +
            "</td></tr><tr><td className='price-component'>Per Night Cost: </td><td>₹" + (baseCost * roomPreferences).toString() +
            "</td></tr><tr><td className='price-component'>Total Room Cost <br>(" + Math.floor((Math.abs(checkOutDate - selectedDate) / 1000) / 86400) + " Nights): </td><td>₹" + (baseCost * Math.floor((Math.abs(checkOutDate - selectedDate) / 1000) / 86400) * roomPreferences).toString() +
            "</td></tr><tr><td className='price-component'>Cab: </td><td>₹" + (Number(document.getElementById('cab-addon').checked * 2000)).toString() +
            "</td></tr><tr><td className='price-component'>Extra Bed: </td><td>₹" + (Number(document.getElementById('xtrabed-addon').checked * 2000)).toString() +
            "</td></tr><tr><td className='price-component'>Custom Bed: </td><td>₹" + (Number(document.getElementById('xlbed-addon').checked * 2000)).toString() +
            "</td></tr><tr><td className='price-component'>GST (9%): </td><td>₹" + (0.09 * newCost) +
            "</td></tr><tr><td className='price-component'><strong>Total Cost: </strong></td><td><strong>₹" + (1.09 * newCost) + "</strong>";

        document.getElementById('estimate-invoice').innerHTML = invoice;
        setFinalCost(newCost);
    }

    const handleRoomPref = (e) => {
        let roomPref = parseInt(e.target.value);
        setRoomPreferences(roomPref);
        if (roomPref === 1)
            setRoomPrefButtonColor('rgba(75, 75, 150, 0.6)')
        if (roomPref === 2)
            setRoomPrefButtonColor('rgba(150, 75, 75, 0.6)')
        if (roomPref === 3)
            setRoomPrefButtonColor('rgba(255, 223, 0, 0.6)')
    }

    const handleRoomChoice = (e) => {
        setFinalCost(finalCost * roomPreferences);
    }


    const handleSubmit = () => {
        alert(billName + ' ' + billEmail);
        localStorage.setItem('RoomTier', roomPreferences);
        localStorage.setItem('RoomCost', finalCost);
        localStorage.setItem('FinalCost', 1.09 * finalCost);
        localStorage.setItem('BillName', billName);
        localStorage.setItem('BillEmail', billEmail);
        localStorage.setItem('HotelName', name);
        localStorage.setItem('HotelLocation', location);
        document.getElementById('alert').style.display = 'block';
    };


    return (
        <div className="quick-tile" id="quick-tile">
            <div class="alert" id="alert">
                <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                <Link to='/bookingconfirmation' style={{fontSize: '20px', fontFamily: 'ubuntu'}}>Booking Successful! Click here to redirect to the confirmation page.</Link>
            </div>
            {/* quick Title */}
            <div className="quick-titlebar" id='quick-title' style={{ textAlign: 'center' }}> {/* Divided into different lines for ease of CSS styling */}
                <div className='left'>
                    <p>You're booking a room at {name}</p>

                    <p className="quick_location">
                        {location}
                    </p>
                </div>
                <div className="right">
                    <p className="quick_price">
                        <small>₹</small>
                        <strong className="quick_price_tag">{costPerNight}</strong>/night
                    </p>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}> {/* Divided into different lines for ease of CSS styling */}
                <table className="quick-body">
                    <tr>
                        <td className="left-column">
                            Set your arrival and departure dates
                            <MuiPickersUtilsProvider class="datePicker" utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Check In"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        style={{ backgroundColor: 'white' }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                            <MuiPickersUtilsProvider class="datePicker" utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Check Out"
                                        value={checkOutDate}
                                        onChange={handleDateChanger}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        style={{ backgroundColor: 'white' }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>

                        </td>
                        <td className='center-column' style={{ alignItems: 'center' }}>
                            Your Room Preferences
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={roomPreferences}
                                onChange={handleRoomPref}
                                label="Age"
                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', marginLeft: '10px', marginRight: '10px' }}
                            >

                                <MenuItem value="1">Deluxe Room</MenuItem>
                                <MenuItem value="2">Deluxe King Room</MenuItem>
                                <MenuItem value="3">Season's Emperor Suite</MenuItem>
                            </Select>
                            <table>
                                <tr>
                                    {roomArray1.map((value, index) => {
                                        return (
                                            <td>
                                                <Button
                                                    style={{
                                                        backgroundColor: roomPrefButtonColor,
                                                        marginLeft: '1px',
                                                        maxWidth: '33px',
                                                        minWidth: '33px'
                                                    }}
                                                    value={index}
                                                    onClick={handleRoomChoice}
                                                >
                                                    {value}
                                                </Button>
                                            </td>
                                        )
                                    })}
                                </tr>
                                <tr>
                                    {roomArray2.map((value, index) => {
                                        return (
                                            <td>
                                                <Button

                                                    style={{
                                                        backgroundColor: roomPrefButtonColor,
                                                        marginLeft: '1px',
                                                        maxWidth: '33px',
                                                        minWidth: '33px'
                                                    }}
                                                    value={index}
                                                    onClick={handleRoomChoice}
                                                >
                                                    {value}
                                                </Button>
                                            </td>
                                        )
                                    })}
                                </tr>
                            </table>

                            <FormGroup row style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', width: '75%', marginLeft: '10%' }}>
                                <FormControlLabel
                                    control={<Checkbox name="checkedA" id="cab-addon" value={1} />}
                                    label="Cab Pickup/Drop "

                                />
                                <FormControlLabel
                                    control={<Checkbox name="checkedA" id="xlbed-addon" />}
                                    label="Extra Large Bed"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="checkedA" id="xtrabed-addon" />}
                                    label="Second Bed"
                                />
                            </FormGroup>
                        </td>

                        <td className='right-column'>
                            <Button
                                size="large"
                                id="submit"
                                type="submit"
                                style={{
                                    marginTop: "1%",
                                    color: 'white',
                                    background: "linear-gradient(45deg, #3734eb 30%, #eb34b1 90%)"
                                }}
                                onClick={getCostEstimate}
                            >
                                Get Cost Estimate
                            </Button>
                            <table id="estimate-invoice" style={{ textAlign: 'left' }}>

                            </table>
                        </td>

                    </tr>
                </table>

                <div style={{ width: "45%", backgroundColor: 'rgba(255, 255, 255, 0.8)', marginLeft: "25%" }}>
                    <FormControl style={{ width: "90%" }}>
                        <TextField
                            label="Billing Name"
                            id="outlined-margin-normal"
                            defaultValue="Default Value"
                            helperText="Ensure that this name matches the one on your Identity"
                            margin="normal"
                            onChange={onChangeName}
                            variant="outlined"
                            value={billName}
                        />

                        <TextField
                            label="Billing Email Address"
                            id="outlined-margin-normal"
                            defaultValue="Default Value"
                            helperText="A copy of the bill will be sent to this email"
                            margin="normal"
                            onChange={onChangeEmail}
                            variant="outlined"
                            value={billEmail}
                        />

                        <TextField
                            label="Billing Phone Number"
                            id="outlined-margin-normal"
                            defaultValue="Default Value"
                            helperText="SMS alerts will be prompted to this number"
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                </div>
                <div style={{ width: "45%", height: '20%', margin: "auto" }}>
                    <Link to="/bookingconfirmation">
                        <Button
                            size="large"
                            id="submit"
                            type="submit"
                            onClick={handleSubmit}
                            style={{
                                marginTop: "10%",
                                color: 'white',
                                background: "linear-gradient(45deg, #3734eb 30%, #eb34b1 90%)"
                            }}
                        >
                            Finalize Booking
                        </Button>
                    </Link>
                    <Link>
                        <Button
                            size="large"
                            id="submit"
                            type="submit"
                            style={{
                                marginLeft: "5%",
                                marginTop: "10%",
                                color: 'white',
                                background: "linear-gradient(45deg, #3734eb 30%, #eb34b1 90%)"
                            }
                            }>
                            Add to tracker
                        </Button>
                    </Link>
                </div>

            </div>
        </div >
    )
}

export default QuickHotel; 