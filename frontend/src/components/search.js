import { React, Component } from 'react';
import '../static/SearchBar.css';
import axios from 'axios';
import * as FcIcons from 'react-icons/fc'
import { Link } from 'react-router-dom';

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
            <div style={{ backgroundColor: 'black' }}>
                <span>We could find {Object.keys(this.state.data).length} hotels matching your search query</span>
                {Object.keys(this.state.data).map((value, index) => {
                    return (
                        <p><Link to={'/viewHotel/' + this.state.data[value]}>{value}</Link></p>
                    )
                })}

                <span>Were you looking for a location instead? We found {this.state.locationMatch.length} locations in our database</span>
                {this.state.locationMatch.map((value, index) => {
                    return(
                        <p><Link to={'/viewHotels/loc=' + value}>{value}</Link></p>
                    )
                })}
            </div>
        )
    }
}