import {React, Component} from 'react';
import '../static/SearchBar.css'; 

export default class SearchBar extends Component {
    constructor(props) {
        super(props); 

        this.state = {}; 
    }

    render() {
        return (
            <input className='search-autocomplete' 
                type='text' 
                placeholder='Search for your favorite hotels right here!'
            />
        )
    }
}