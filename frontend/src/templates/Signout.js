import React from "react"
import axios from "axios";
import { Redirect } from 'react-router-dom';


// components: Name, Price, Rating, Image, Catergory, Number of Reviews, UniqueProductID?

function Signout() {

    /*
    function Wishlist(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/users/wishlist/add/' + id)  
            .then(res => {
                alert(JSON.stringify(res.data));  
            })
            .catch(err => alert(JSON.stringify(err))); 
    } */

    
    localStorage.removeItem("Username"); 
    return (
        <Redirect to="/"/>
    )
}

export default Signout; 