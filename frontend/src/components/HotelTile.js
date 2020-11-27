import React from "react"
import axios from "axios";
import '../static/HotelTile.css'
import * as BsIcons from "react-icons/bs";
import * as GrIcons from "react-icons/gr";
import * as BiIcons from "react-icons/bi";
import * as GiIcons from "react-icons/gi";
import Button from '@material-ui/core/Button';
import 'date-fns';
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from "@material-ui/pickers";


// components: Name, Price, Rating, Image, Catergory, Number of Reviews, UniqueProductID?


function HotelTile({ name, costPerNight, hotel_rating, user_rating, image, amenities, id, location }) {

    /*
    function Wishlist(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/wishlist/add/' + id)  
            .then(res => {
                alert(JSON.stringify(res.data));  
            })
            .catch(err => alert(JSON.stringify(err))); 
    } */

    const iconArray = {
        "Wifi": <BsIcons.BsWifi style={{color: 'black'}}/>,
        "Multi-Cuisine Restaurant": <GrIcons.GrRestaurant style={{color: 'black'}} />,
        "Swimming Pool": <GrIcons.GrSwim style={{color: 'black'}} />,
        "Gymnasium": <BiIcons.BiDumbbell style={{color: 'black'}} />,
        "Free Breakfast": <GiIcons.GiOpenedFoodCan style={{color: 'black'}} />,
        "Free Parking": <BiIcons.BiCar style={{color: 'black'}} />
    }

    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);

        /* Make an axios request to fetch the vacancies on this date */
        var vacancies = 255;
        if (parseInt(vacancies) <= 5) {
            document.getElementById("vacancy-display").innerText = "Rooms Available: " + vacancies;
            document.getElementById("vacancy-display").style = "color: red";
        }
        else {
            document.getElementById("vacancy-display").innerText = "Rooms Available: " + vacancies;
            document.getElementById("vacancy-display").style = "color: green";
        }
    }

    return (
        <div className="hotel-tile">
            {/* Hotel Title */}
            <div className="hotel-titlebar" style={{ textAlign: 'center' }}> {/* Divided into different lines for ease of CSS styling */}
                <div className='left'>
                    <p>{name}</p>
                    <p className="hotel_rating">

                        {hotel_rating}<BsIcons.BsStarFill style={{ color: 'blue' }} />/5
                    </p>
                    <p className="hotel_location">
                        {location}
                    </p>
                </div>
                <div className="center">
                    <Link to={'/viewHotel/' + "ID"}>
                        <Button size="large" style={{ color: 'white', background: "linear-gradient(45deg, #3734eb 30%, #eb34b1 90%)" }}>
                            Hotel Page
                        </Button>
                    </Link>
                </div>
                <div className="right">
                    <p className="hotel_price">
                        <small>₹</small>
                        <strong className="hotel_price_tag">{costPerNight}</strong>/night
                    </p>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}> {/* Divided into different lines for ease of CSS styling */}
                <table className="hotel-body">
                    <tr>
                        <td className='left-column'>
                            <img src="https://gommts3.mmtcdn.com/htl-imgs/htl-imgs/4190725563799612-20090w000000k89it0142_R_550_412_R5.jpg?&output-quality=75&downsize=910:612&crop=910:612;141,0&output-format=jpg" alt="Hotel" className="hotel_image" />
                            <p className="user_rating">
                                Average User Rating: {user_rating}<BsIcons.BsStarFill style={{ color: 'blue' }} />/5
                            </p>
                            <p className="hotel_reviews">
                                From customer(s) who have reviewed this hotel
                            </p>
                        </td>
                        <td className="right-column">
                            <p className="hotel_amenties" style={{margin: "auto", maxWidth: '85%'}}>

                                Amenities:
                                {console.log(Object.keys(amenities))}

                                {Object.keys(iconArray).map((key) => {
                                    let chipcolor = (amenities[key]) ? '#eb34b1' : '#aaaaaa';
                                    return (
                                        <Chip avatar={<Avatar>{iconArray[key]}</Avatar>}
                                            label={key} style={{ backgroundColor: chipcolor, marginRight: '5px', marginLeft: '5px', marginTop: '5px' }} />
                                    )
                                })}
                            </p>

                                <MuiPickersUtilsProvider class="datePicker" utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Check Vacancies"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                            style={{ backgroundColor: 'white' }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                                <div id="vacancy-display">
                                    Select a date from the picker to see the available rooms on the day
                            </div>
                                <Link to="/quickbook/ID">
                                    <Button
                                        size="large"
                                        id="submit"
                                        type="submit"
                                        style={{
                                            marginTop: "10%",
                                            color: 'white',
                                            background: "linear-gradient(45deg, #3734eb 30%, #eb34b1 90%)"
                                        }
                                        }>
                                        Quick Book
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
                        </td>
                    </tr>
                </table>
            </div>
            </div >
    )
}

export default HotelTile; 