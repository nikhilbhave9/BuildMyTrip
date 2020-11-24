const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    itemName: {type: String, required: true},
    location: {type: String, required: true},
    country: {type: String, required: true},
    itemCost: {type: Number, required: true},
    // userRating: {type: Number, required: true},
    // standardRating: {type: Number, required: true},
    ratings: {type: Array},
    amenities: {type: Array, required: true}, 
    vacancies: {type: Array, required: true},
    tracking: {type: Array, required: true},
    imagesLink: {type: Array}
}, {
    timpestamps: true
});

const hotel = mongoose.model('hotel', hotelSchema) // Define/retrieve the model that we made 

module.exports = hotel;