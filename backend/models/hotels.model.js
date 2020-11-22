const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
    itemName: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, required: true},
    itemCost: {type: Number, required: true},
    averageRating: {type: Number, required: true},
    totalRatings: {type: Number, required: true},
    rating: {type: Array},
    imagesLink: {type: String},
}, {
    timpestamps: true
});

const hotel = mongoose.model('hotel', hotelSchema) // Define/retrieve the model that we made 

module.exports = shop;