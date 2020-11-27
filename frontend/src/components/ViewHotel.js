import React, { Component } from "react"
import axios from "axios";
import Navbar from '../components/Navbar';
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
import { Link, useParams } from 'react-router-dom';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import '../static/ViewHotel.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Rating from '@material-ui/lab/Rating';


// components: Name, Price, Rating, Image, Catergory, Number of Reviews, UniqueProductID?


export default class ViewHotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelData: null,
            selectedDate: new Date(),
            isLoading: true,
            ratingDistro: {}
        }

        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        let urlParam = this.props.match.params.id
        axios.get('http://localhost:5000/hotels/' + urlParam)
            .then(res => {
                this.setState({ hotelData: res.data });
                this.setState({ isLoading: false });
            })
            .catch(err => alert(err));
    }

    handleDateChange(e) {
        this.setState({ selectedDate: e.target.value });
    }
    /* Make an axios request to fetch the vacancies on this date */

    render() {
        const { isLoading } = this.state;
        if (isLoading) {
            return <div> Loading... </div>;
        }

        const iconArray = {
            "Wifi": <BsIcons.BsWifi style={{ color: 'black' }} />,
            "Multi-Cuisine Restaurant": <GrIcons.GrRestaurant style={{ color: 'black' }} />,
            "Swimming Pool": <GrIcons.GrSwim style={{ color: 'black' }} />,
            "Gymnasium": <BiIcons.BiDumbbell style={{ color: 'black' }} />,
            "Free Breakfast": <GiIcons.GiOpenedFoodCan style={{ color: 'black' }} />,
            "Free Parking": <BiIcons.BiCar style={{ color: 'black' }} />
        }

        return (

            <>
                <Navbar />
                <div className="viewhotel-tile">
                    <div className="background" />
                    {/* Hotel Title */}
                    <div className="hotel-titlebar" style={{ textAlign: 'center', fontFamily: 'ubuntu' }}> {/* Divided into different lines for ease of CSS styling */}
                        <div className='left'>
                            <span>{this.state.hotelData.itemName}</span>
                            <br />
                            <span className="hotel_location">
                                {this.state.hotelData.location}
                            </span>
                        </div>
                        <div className="center">
                            <p className="hotel_amenties">
                            </p>
                            <Link to="/quickbook/ID">
                                <Button
                                    size="large"
                                    id="submit"
                                    type="submit"
                                    style={{
                                        marginTop: "1%",
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
                                        marginTop: "1%",
                                        color: 'white',
                                        background: "linear-gradient(45deg, #3734eb 30%, #eb34b1 90%)"
                                    }
                                    }>
                                    Add to tracker
                        </Button>
                            </Link>
                        </div>
                        <div className="right">
                            <p className="hotel_price">
                                <small>₹</small>
                                <strong className="hotel_price_tag">{this.state.hotelData.itemCost}</strong>/night
                    </p>

                        </div>
                    </div>

                    <div style={{ textAlign: 'center' }}> {/* Divided into different lines for ease of CSS styling */}
                        <table className="hotel-body" style={{ tableLayout: 'auto' }}>
                            <tbody>
                                <tr>

                                </tr>
                                <tr>
                                    <td className='left-image_slideshow'>
                                        <CarouselProvider
                                            naturalSlideWidth={60}
                                            naturalSlideHeight={35}
                                            totalSlides={4}
                                            style={{ marginTop: '25px' }}
                                        >
                                            <Slider>
                                                {this.state.hotelData.imagesLink.map((item, index) => {
                                                    return (
                                                        <Slide index={index}><img src={item} alt={"Slide " + index} /></Slide>)
                                                })}
                                            </Slider>
                                            <ButtonBack>&#60;</ButtonBack>
                                            <ButtonNext>&#62;</ButtonNext>
                                        </CarouselProvider>

                                    </td>
                                    <td className='cost-sheet'
                                        style={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                        }}>
                                        Cost Sheet
                                        <table style={{ width: '95%', fontFamily: 'satisfy' }}>
                                            <tbody>
                                                <tr style={{ color: 'turquoise' }}>
                                                    <td style={{ textAlign: 'left', verticalAlign: 'top' }}>Deluxe Room</td>
                                                    <td style={{ textAlign: 'right' }}>₹{this.state.hotelData.itemCost}</td>
                                                </tr>
                                                <tr style={{ color: 'red' }}>
                                                    <td style={{ textAlign: 'left' }}>Deluxe King Room</td>
                                                    <td style={{ textAlign: 'right' }}>₹{2 * this.state.hotelData.itemCost}</td>
                                                </tr>
                                                <tr style={{ color: 'gold' }}>
                                                    <td style={{ textAlign: 'left' }}>Seasons' Emperor Room</td>
                                                    <td style={{ textAlign: 'right' }}>₹{3 * this.state.hotelData.itemCost}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="hotel_amenties" style={{ margin: "auto", maxWidth: '85%' }}>
                                            {Object.keys(iconArray).map((key) => {
                                                let chipcolor = (this.state.hotelData.amenities[0][key]) ? '#eb34b1' : '#aaaaaa';
                                                return (
                                                    <Chip avatar={<Avatar>{iconArray[key]}</Avatar>}
                                                        label={key} style={{ backgroundColor: chipcolor, marginRight: '5px', marginLeft: '5px', marginTop: '5px' }} />
                                                )
                                            })}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='viewhotel-titlebar' style={{ color: 'white' }}>
                        <span style={{ marginTop: "1%" }}>Ratings and Reviews</span><br />
                        <span style={{ fontSize: '20px' }}>Displaying {this.state.hotelData.ratings.length} ratings</span>
                    </div>
                    <div style={{ color: 'white' }}>
                        <table style={{ width: '65%' }}>
                            <tbody>
                                {this.state.hotelData.ratings.map((value, key) => {
                                    console.log(value);
                                    return (<tr style={{ width: '50%' }}>
                                        <td className='table-cell' id='email'>{value['email']}</td>
                                        <td className='table-cell' id='rating'><strong>{value.rating}/5</strong></td>
                                        <td className='table-cell' id='description'><em>"{value.description}"</em></td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div id='viewhotel-titlebar' style={{ color: 'white' }}>
                        <span style={{ marginTop: "1%" }}>Your Rating</span><br />
                    </div>
                    <table style={{ color: 'white' }}>
                        <tr>
                            <td><textarea className="inp-text" type="text" placeholder="Review"/></td>
                            <td><input className="inp-num" type="number"  min="1" max="5" placeholder="Rating out of 5"/></td>
                        </tr>
                    </table>
                </div>
            </>
        )
    }
}

