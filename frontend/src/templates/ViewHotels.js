import React, { Component } from 'react';
import Header from '../components/Header';
import '../static/CustomFiltering.css'; 
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';





export default class MainView extends Component {
    constructor (props) {
        super (props); 
        this.state = {}; 
    }

    render() {
        return (
            <div>
                {this.props.match.params.country}
                <Header/>
                <div className="CustomFiltering" style={{"padding": "15px", "vertical-align": "middle", "width": "100%"}}>
                    SORT BY                    
                    <FormControl id="Sort">
                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            <FormControlLabel
                                value="PHL"
                                control={<Radio color="primary" />}
                                label="Prices: High to Low"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value="PLH"
                                control={<Radio color="primary" />}
                                label="Prices: Low to High"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value="NAZ"
                                control={<Radio color="primary" />}
                                label="Name: A to Z"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value="NZA"
                                control={<Radio color="primary" />}
                                label="Name: Z to A"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value="R"
                                control={<Radio color="primary" />}
                                label="Rating: High to Low"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value="P"
                                control={<Radio color="primary" />}
                                label="Popularity: High to Low"
                                labelPlacement="top"
                            />
                            <Button id="sortBtn" variant="outlined" color="primary" onClick={this.sort}>
                                Sort
                            </Button>
                        </RadioGroup>
                    </FormControl>
                    <FormControl id="Filter" style={{marginLeft: "50px", color: "orange"}}> 
                        <InputLabel id="demo-simple-select-autowidth-label" style={{color: "#ffffff"}}>Country</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={this.props.match.params.country}
                                style={{minWidth: "100px", color: "white"}}
                            >
                                <MenuItem value="">
                                    <em>{this.props.match.params.country}</em>
                                </MenuItem>
                                <MenuItem value={10}>New Zealand</MenuItem>
                                <MenuItem value={20}>Singapore</MenuItem>
                                <MenuItem value={30}>Switzerland</MenuItem>
                            </Select>
                        
                            <Button id="filterBtn" variant="outlined" color="primary" onClick={this.sort}>
                                Filter
                            </Button>
                    </FormControl> 
                </div>
                
            </div> 
        )
    }
}