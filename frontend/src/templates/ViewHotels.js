import React, { Component } from 'react'; 
import axios from 'axios';
import HotelTile from '../components/HotelTile'; 
import '../static/HotelTile.css'
import '../static/ViewHotels.css'

export default class DisplayHotels extends Component{

    constructor(props) {
        super(props);

        this.state = {
            mdata: [], 
            filter: ""
        }
    };

    render() {
        return (
            <div> 
                <div className="background"></div> 
                <div className="CustomFiltering" style={{"padding": "15px", "vertical-align": "middle"}}>
                    Sort By 
                    <form>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="D" id="cost"/> Prices: High to Low
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="A" id="cost"/> Prices: Low to High
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="A" id="itemName"/> Name: A to Z
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="D" id="itemName"/> Name: Z to A
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="D" id="avgRatings"/> Rating: High to Low
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optradio" value="A" id="avgRatings"/> Rating: Low to High
                        </label>
                        <button>Sort</button>
                    
                        <select name="Filter" id="Filter" style={{"margin-left": "90px", "margin-right": "20px"}}>
                            <option value="" disbaled>Category</option> 
                            <option value="Processor">Processors</option>
                            <option value="Display">Display</option>
                            <option value="GPU">GPU</option>
                        </select>
                        <button>Filter</button>
                    </form> 
                </div>

                <div className="homepage" style={{"margin-top": "50px"}}>
                    <HotelTile/> 
                    {this.state.mdata.map((data, index) => {
                        if (this.state.filter.length <= 0) {
                            {/* If no filter has been applied, list all items unconditionally */}
                            return ( 
                                <HotelTile/> 
                            )
                        }

                        else if (this.state.filter === data.category){  
                            {/* If a filter has been applied, list only the items that pass the filter */}
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
  