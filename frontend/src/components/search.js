import { React, Component } from 'react';
import '../static/SearchBar.css';
import axios from 'axios';
import * as FcIcons from 'react-icons/fc'
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchField: '',
            data: [],
            locationMatch: [],
            loading: true
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/hotels/getHotelNames/' + this.props.match.params.search_query)
            .then(res => {
                this.setState({ data: res.data }, () => {
                    let locations = ["Boon Lay, Singapore", "Queenstown, Singapore", "Marina Bay, Singapore", "Orchard Road, Singapore"];

                    let search_query = new RegExp(this.props.match.params.search_query, "gi");
                    let locMatch = []
                    for (let location in locations) {
                        if (locations[location].match(search_query))
                            locMatch.push(locations[location]);
                    }
                    console.log(locMatch); 
                    this.setState({locationMatch: locMatch}, this.setState({loading: false}));
                })


            })
            .catch(err => alert(err.message));
    }

    render() {
        if (this.state.loading)
            return (<div>Loading...</div>)

        return (
            <div>
                <img 
                    alt='search-bground'
                    src={'https://www.thewowstyle.com/wp-content/uploads/2015/01/beautiful-city-waterfront-at-night-hdr-323829.jpg'}
                    style={{
                        position: "fixed",
                        display: "cover",
                        width: "100%",
                        left: "50%",
                        top: "50%",
                        height: "100%",
                        objectFit: "cover",
                        transform: "translate(-50%, -50%)",
                        zIndex: "-1",
                    }}>
                </img>

                <Navbar/>
                
                <table style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', margin: 'auto', width: '60%', marginTop: '10%', textAlign: 'center'}}>
                    <thead style={{color: 'white'}}>We could find {Object.keys(this.state.data).length} hotels matching your search query</thead>
                    <tbody>
                        {Object.keys(this.state.data).map((value, index) => {
                            return (
                                <tr><p><Link style={{fontSize: '20px'}} to={'/hotel/' + this.state.data[value]}>{value}</Link></p></tr>
                            )
                        })}
                    </tbody>
                </table>
                <table style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', margin: 'auto', width: '60%', marginTop: '2%', textAlign: 'center'}}>
                    <thead style={{color: 'white'}}>Were you looking for a location instead? We found {this.state.locationMatch.length} locations in our database matching your query</thead>
                    {this.state.locationMatch.map((value, index) => {
                        return(
                            <p><Link style={{fontSize: '20px'}} to={'/viewHotels/loc=' + value}>{value}</Link></p>
                        )
                    })}
                </table>
            </div>
        )
    }
}