import React, { Component } from 'react'; 
import axios from 'axios';
import QuickHotel from '../components/QuickHotel'; 
import '../static/HotelTile.css'
import '../static/QuickBook.css'

export default class QuickBook extends Component{

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


                <div className="homepage" style={{"margin-top": "50px"}}>
                    <QuickHotel/> 
                    {this.state.mdata.map((data, index) => {
                        if (this.state.filter.length <= 0) {
                            {/* If no filter has been applied, list all items unconditionally */}
                            return ( 
                                <QuickHotel/> 
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
  