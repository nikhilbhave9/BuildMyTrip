import React, { Component } from 'react';
import axios from 'axios';
import QuickHotel from '../components/QuickHotel';
import '../static/HotelTile.css'
import '../static/QuickBook.css'
import Navbar from '../components/Navbar';

export default class QuickBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hotelData: [],
            isLoading: true,
        }
    };

    componentDidMount() {
        let urlParam = this.props.match.params.id
        axios.get('http://localhost:5000/hotels/' + urlParam)
            .then(res => {
                this.setState({ hotelData: res.data });
                this.setState({ isLoading: false });
            })
            .catch(err => alert(err));
    }

    render() {
        const { isLoading } = this.state;
        if (isLoading) {
            return <div> Loading... </div>;
        }

        return (
            <div>
                <Navbar/>
                <div className="background"></div>


                <div className="homepage" style={{ "margin-top": "50px" }}>
                    <QuickHotel
                        name={this.state.hotelData.itemName}
                        costPerNight={this.state.hotelData.itemCost}
                        id={this.state.hotelData._id}
                        location={this.state.hotelData.location}
                    />
                </div>
            </div>
        )
    }

}
