import React, { Component } from "react"
import axios from "axios";
import Navbar from '../components/Navbar';
import * as BsIcons from "react-icons/bs";
import * as GrIcons from "react-icons/gr";
import * as BiIcons from "react-icons/bi";
import * as GiIcons from "react-icons/gi";
import Button from '@material-ui/core/Button';
import 'date-fns';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import '../static/ViewHotel.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


// components: Name, Price, Rating, Image, Catergory, Number of Reviews, UniqueProductID?


export default class ViewHotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelData: null,
            selectedDate: new Date(),
            isLoading: true,
            recommendations: [],
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

        axios.get('http://localhost:5000/hotels/')
            .then(res => {
                let recoData = [];
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i]._id === this.state.hotelData._id)
                        continue;

                    if (res.data[i].location === this.state.hotelData.location)
                        recoData.push(res.data[i]);
                }
                this.setState({ recommendations: recoData });
                console.log(recoData);
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
                            <Link to={"/quickbook/" + this.state.hotelData._id}>
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
                                    Book a room
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
                                            style={{ marginTop: '25px', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                                        >
                                            <Slider>
                                                {this.state.hotelData.imagesLink.map((item, index) => {
                                                    return (
                                                        <Slide index={index}><img className='slide-image' src={item} alt={"Slide " + index} /></Slide>)
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

                    <div className='viewhotel-titlebar' style={{ color: 'white', marginTop: '5%', letterSpacing: '1px' }}>
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

                    <div id='viewhotel-titlebar' style={{ color: 'white', marginTop: '5%', letterSpacing: '1px' }}>
                        <span style={{ marginTop: "1%" }}>Your Rating</span><br />
                    </div>
                    <table style={{ color: 'white' }}>
                        <tr>
                            <td><textarea className="inp-text" type="text" placeholder="Review" /></td>
                            <td><input className="inp-num" type="number" min="1" max="5" placeholder="Rating out of 5" /></td>
                        </tr>
                    </table>

                    <div id='viewhotel-titlebar' style={{ color: 'white', marginTop: '5%', textAlign: 'center', fontColor: 'ubuntu', letterSpacing: '1px' }}>
                        <span style={{ marginTop: "1%" }}>You Might Also Want to Look At</span><br />
                    </div>
                    <div style={{ margin: 'auto' }}>
                        <div style={{ textAlign: 'center' }}> {/* Divided into different lines for ease of CSS styling */}
                            <table className="hotel-body" style={{ tableLayout: 'auto', maxHeight: '200px' }}>
                                <tbody>
                                    <tr>
                                        <td className='left-image_slideshow'>
                                            <CarouselProvider
                                                naturalSlideWidth={60}
                                                naturalSlideHeight={20}
                                                totalSlides={this.state.recommendations.length}
                                                style={{ marginTop: '25px' }}
                                            >
                                                <Slider>
                                                    {this.state.recommendations.map((item, index) => {
                                                        return (
                                                            <Slide index={index}>
                                                                <div style={{ fontFamily: 'satisfy', fontSize: '20px' }}>
                                                                    <Link 
                                                                        style={{fontSize: '20px'}}
                                                                        to={'' + item._id}>{item.itemName}</Link>:  
                                                                    ({item.location}) {item.standardRating}
                                                                    <BsIcons.BsStarFill style={{ color: 'yellow' }} />/5
                                                                </div>
                                                                <img
                                                                    className='slide-image'
                                                                    src={item.imagesLink[0]}
                                                                    alt={"Slide " + index}
                                                                    style={{
                                                                        marginTop: '1%'
                                                                    }}
                                                                />
                                                                <div style={{ fontFamily: 'ubuntu' }}>₹{item.itemCost}/night</div>
                                                                <p className="hotel_amenties" style={{ margin: "auto", maxWidth: '85%', marginTop: '5px' }}>
                                                                    {Object.keys(iconArray).map((key) => {
                                                                        let chipcolor = (item.amenities[0][key]) ? '#eb34b1' : '#aaaaaa';
                                                                        return (
                                                                            <Chip avatar={<Avatar>{iconArray[key]}</Avatar>}
                                                                                label={key} style={{ backgroundColor: chipcolor, marginRight: '5px', marginLeft: '5px', marginTop: '5px' }} />
                                                                        )
                                                                    })}
                                                                </p>
                                                                <div 
                                                                    style={{ 
                                                                        fontFamily: 'ubuntu', 
                                                                        marginTop: '5px' 
                                                                    }}
                                                                >
                                                                    Average User Rating: {item.userRating}<BsIcons.BsStarFill style={{ color: 'yellow' }} />/5
                                                                    Evaluated from {item.ratings.length + 1} reviews. 
                                                                </div>

                                                            </Slide>)
                                                    })}
                                                </Slider>
                                                                <ButtonBack>&#60;</ButtonBack>
                                                                <ButtonNext>&#62;</ButtonNext>
                                            </CarouselProvider>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                        </div>
            </>
        )
    }
}

