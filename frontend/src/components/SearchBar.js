import { React, Component } from 'react';
import '../static/SearchBar.css';
import axios from 'axios';
import * as FcIcons from 'react-icons/fc'

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchField: '',
            data: [],
            JSONSuggestions: {},
            suggestions: [],
        };
        this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    }

    UNSAFE_componentWillMount() {
        axios.get('http://localhost:5000/hotels/hoteldatapair')
            .then(res => {
                this.setState({ JSONSuggestions: res.data })
                this.setState({ data: Object.keys(res.data) })
            })
    }



    onKeyUpHandler(e) {
        this.setState({ searchField: e.target.value });

        let value = e.target.value;
        let suggestions = [];
        if (e.target.value && e.target.value !== '') {
            const regex = RegExp(`^${value}`, 'i');
            suggestions = this.state.data.sort().filter(v => regex.test(v));

            document.getElementById('search_box').style = 'display: flex';
            this.setState({ suggestions });
            console.log(this.state.data);
        }

        if (e.target.value === '')
            document.getElementById('search_box').style = 'display: none';
    }

    selectedText(value) {
        this.setState(() => ({
            searchField: value
        }))
    }

    renderSuggestions = () => {
        let { suggestions } = this.state;
        return (
            /* Get an unordered list of suggestions from the item Name array for suggestions */
            <ul>
                {
                    suggestions.map((item, index) => (<li className="list-item" key={index}><a href={'http://localhost:3000/hotel/' + this.state.JSONSuggestions[item]}>{item}</a></li>))
                }
                <li className="list-item"><a style={{color: 'yellow'}} href={'http://localhost:3000/search/q=' + this.state.searchField}>
                        <FcIcons.FcSearch style={{marginRight: '10px', fontSize: '30px'}}/>Do a Fuzzy Search on '{this.state.searchField}'</a></li>
            </ul>

        );
    }

    render() {
        return (
            <search style={{ margin: "auto", top: "20%", display: "flex", alignItems: "center", height: "50px", marginLeft: "17.5%" }}>
                <input className='search-autocomplete'
                    type='text'
                    placeholder='Search for your favorite hotels right here!'
                    value={this.state.searchField}
                    onChange={this.onKeyUpHandler}
                />

                <div id="search_box" className="search_results">
                    <ul>{this.renderSuggestions()}</ul>
                </div>
            </search>
        )
    }
}