import React, { Component } from 'react';
import axios from 'axios';
import HotelTile from '../components/HotelTile';
import '../static/HotelTile.css'
import '../static/ViewHotels.css'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

export default class DisplayHotels extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mdata: [],
            filter: "",
            selectedDate: new Date(), 
            amenities: {}, 
            loading: true
        }
        this.sortAsc = this.sortAsc.bind(this);
        this.sortDsc = this.sortDsc.bind(this);
        this.sort = this.sort.bind(this);
        this.filter = this.filter.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    };

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
         
    };

    sort(e) {
        e.preventDefault(); 

        /* Helper function to sort JSON data by a key */ 
        let sortType = document.querySelector('input[type="radio"]:checked'); 

        if (sortType.value === 'A') 
            this.sortAsc(e, sortType.id);
        else if (sortType.value === 'D')
            this.sortDsc(e, sortType.id); 
    }

    sortAsc(e, key) {        
        /* Function that sorts a JSON object array in ascending on the basis of the key */

        e.preventDefault();
        /* Referred to: https://stackoverflow.com/questions/8175093/simple-function-to-sort-an-array-of-objects */ 

        let tempData = this.state.mdata; 

        tempData = tempData.sort(function(e1, e2) {
            var element1 = e1[key];
            var element2 = e2[key];

            return ((element1 < element2) ? -1: ((element1 > element2) ? 1 : 0)); 
        });

        this.setState({mdata: tempData}); 
    }

    sortDsc(e, key) {
        /* Function that sorts a JSON object array in descending on the basis of the key */ 
        
        e.preventDefault();
        /* Referred to: https://stackoverflow.com/questions/8175093/simple-function-to-sort-an-array-of-objects */ 

        let tempData = this.state.mdata; 

        tempData = tempData.sort(function(e1, e2) {
            var element1 = e1[key];
            var element2 = e2[key];

            return ((element1 > element2) ? -1: ((element1 < element2) ? 1 : 0)); 
        });

        this.setState({mdata: tempData}); 
    }

    filter(e) {
        /* Helper function to filter products by the category */ 
        e.preventDefault(); 
        let value = document.getElementById("Filter").value; 
        this.setState({filter: value}); 
    }

    componentDidMount() {
        axios.get('http://localhost:5000/hotels/')
            .then(res => {
                /* Get the list of all the products and set the state */
                this.setState({ mdata: res.data });
                this.setState({loading: false}); 
            })
            .catch(err => console.log(err)); 
    }

    render() {

        if (this.state.loading)
            return (<div>Loading...</div>)

        return (
            <div>
                <div className="background"></div>
                <div className="CustomFiltering" style={{ "padding": "15px", "vertical-align": "middle" }}>
                    Sort By
                    <form>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="D" id="itemCost" /> Prices: High to Low
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="A" id="itemCost" /> Prices: Low to High
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="A" id="itemName" /> Name: A to Z
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="D" id="itemName" /> Name: Z to A
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="D" id="standardRating" /> Rating: High to Low
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="A" id="standardRating" /> Rating: Low to High
                        </label>
                        <button onClick={this.sort}>Sort</button>

                        <select name="Filter" id="Filter" style={{ "margin-left": "90px", "margin-right": "20px" }}>
                            <option value="" disbaled>Category</option>
                            <option value="Marina Bay, Singapore">Marina Bay</option>
                            <option value="Queenstown, Singapore">Queenstown</option>
                            <option value="Orchard Road, Singapore">Orchard Road</option>
                            <option value="Boon Lay, Singapore">Boon Lay</option>
                        </select>
                        <button onClick={this.filter}>Filter</button>
                    </form>
                </div>

                <div className="homepage" style={{ "margin-top": "50px" }}>
                    <div className="side-pane" style={{ fontSize: "20px", textAlign: 'center', fontFamily: "Satisfy", marginTop: "10px" }}>
                        <br />Change dates
                        <MuiPickersUtilsProvider class="datePicker" utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="From"
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    style={{ backgroundColor: 'rgba(255,255,255,0.75)', width: '80%' }}
                                />
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="To"
                                    format="MM/dd/yyyy"
                                    value={this.state.selectedDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    style={{ backgroundColor: 'rgba(255,255,255,0.65)', width: '80%' }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <br />
                        Amenities
                        <form>
                            <label class="container">Wifi
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>

                            <label class="container">Restaraunt
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Swimming
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>

                            <label class="container">Gymnasium
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Free Breakfast
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>

                            <label class="container">Free Parking
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>

                        </form>
                    </div>
                    {this.state.mdata.map((data, index) => {
                        console.log(this.state.mdata[index]);
                        if (this.state.filter.length <= 0) {
                            {/* If no filter has been applied, list all items unconditionally */ }
                            return (

                                <HotelTile 
                                    name = {data.itemName}
                                    costPerNight = {data.itemCost}
                                    hotel_rating = {data.standardRating}
                                    user_rating = {data.userRating}
                                    image = {data.imagesLink[0]}
                                    amenities = {data.amenities[0]}
                                    id = {data._id}
                                    location = {data.location} 
                                />
                            )
                        }

                        else if (this.state.filter === data.location) {
                            {/* If a filter has been applied, list only the items that pass the filter */ }
                            return (
                                <HotelTile 
                                    name = {data.itemName}
                                    costPerNight = {data.itemCost}
                                    hotel_rating = {data.standardRating}
                                    user_rating = {data.userRating}
                                    image = {data.imagesLink[0]}
                                    amenities = {data.amenities[0]}
                                    id = {data._id}
                                    location = {data.location} 
                                />
                            )
                        }
                    })}
                </div>
            </div>
        )
    }

}
