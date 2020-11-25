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
            selectedDate: new Date()
        }

        this.handleDateChange = this.handleDateChange.bind(this);
    };

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    };

    render() {
        return (
            <div>
                <div className="background"></div>
                <div className="CustomFiltering" style={{ "padding": "15px", "vertical-align": "middle" }}>
                    Sort By
                    <form>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="D" id="cost" /> Prices: High to Low
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="A" id="cost" /> Prices: Low to High
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="A" id="itemName" /> Name: A to Z
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="D" id="itemName" /> Name: Z to A
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="D" id="avgRatings" /> Rating: High to Low
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="A" id="avgRatings" /> Rating: Low to High
                        </label>
                        <button>Sort</button>

                        <select name="Filter" id="Filter" style={{ "margin-left": "90px", "margin-right": "20px" }}>
                            <option value="" disbaled>Category</option>
                            <option value="Processor">Processors</option>
                            <option value="Display">Display</option>
                            <option value="GPU">GPU</option>
                        </select>
                        <button>Filter</button>
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
                                <input type="checkbox"/>
                                <span class="checkmark"></span>
                            </label>

                            <label class="container">Restaraunt
                                <input type="checkbox"/>
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Swimming
                                <input type="checkbox"/>
                                <span class="checkmark"></span>
                            </label>

                            <label class="container">Gymnasium
                                <input type="checkbox"/>
                                <span class="checkmark"></span>
                            </label>
                            <label class="container">Free Breakfast
                                <input type="checkbox"/>
                                <span class="checkmark"></span>
                            </label>
                            
                            <label class="container">Free Parking
                                <input type="checkbox"/>
                                <span class="checkmark"></span>
                            </label>

                        </form>
                    </div>
                    <HotelTile />
                    {this.state.mdata.map((data, index) => {
                        if (this.state.filter.length <= 0) {
                            {/* If no filter has been applied, list all items unconditionally */ }
                            return (

                                <HotelTile />
                            )
                        }

                        else if (this.state.filter === data.category) {
                            {/* If a filter has been applied, list only the items that pass the filter */ }
                            return (
                                <h1>Hotels here</h1>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }

}
