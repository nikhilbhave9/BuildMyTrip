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
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        width: 200,
    },
}));



export default function MainView(props) {
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const [value, setValue] = React.useState([0, 100]);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleSlideChange = (event, newValue) => {
        setValue(newValue);
    };

    function valuetext(value) {
        return `${value}°C`;
    }

    return (
        <div>
            {props.match.params.country}
            <Header />
            <div className="CustomFiltering" style={{ "padding": "15px", "vertical-align": "middle", "width": "100%" }}>
                SORT BY
                <FormControl id="Sort">
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel
                            value="PHL"
                            control={<Radio color="primary" />}
                            label={
                                <Typography style={{ fontSize: "12px" }}>Prices: High to Low</Typography>
                            }
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="PLH"
                            control={<Radio color="primary" />}
                            label={
                                <Typography style={{ fontSize: "12px" }}>Prices: Low to High</Typography>
                            }
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="NAZ"
                            control={<Radio color="primary" />}
                            label={
                                <Typography style={{ fontSize: "12px" }}>Name: A to Z</Typography>
                            }
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="NZA"
                            control={<Radio color="primary" />}
                            label={
                                <Typography style={{ fontSize: "12px" }}>Name: Z to A</Typography>
                            }
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="R"
                            control={<Radio color="primary" />}
                            label={
                                <Typography style={{ fontSize: "12px" }}>Rating: High to Low</Typography>
                            }
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="P"
                            control={<Radio color="primary" />}
                            label={
                                <Typography style={{ fontSize: "12px" }}>Popularity: High to Low</Typography>
                            }
                            labelPlacement="top"
                        />
                        <Button id="sortBtn" variant="outlined" color="primary" >
                            Sort
                            </Button>
                    </RadioGroup>
                </FormControl>

                <FormControl className={classes.formControl} style={{ top: "-27.5%", left: "1%" }}>
                    <InputLabel id="demo-simple-select-autowidth-label">Country</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={age}
                        onChange={handleChange}
                        autoWidth
                    >
                        <MenuItem value="">
                            <em>{props.match.params.country}</em>
                        </MenuItem>
                        <MenuItem value={10}>New Zealand</MenuItem>
                        <MenuItem value={20}>Singapore</MenuItem>
                        <MenuItem value={30}>Switzerland</MenuItem>
                    </Select>

                    <div className={classes.root} style={{top: "-80%", left: "120%"}}>
                        <Slider style={{top: "-80%", left: "120%"}}
                            value={value}
                            onChange={handleSlideChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={valuetext}
                        />
                        
                    </div>
                    <Button id="filterBtn" variant="outlined" color="primary" style={{ top: "-225%", left: "235%"}}>
                        Filter
                    </Button>
                </FormControl>
            </div>
        </div>
    )
}
