const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

/* Schema for the database containing the primary details of a user */ 

const userSchema = new Schema({
    name: {type: String, required: true, unique: false},
    email: {type: String, required: true, unique: true}
}, {
    timestamps: true
});
 
const user = mongoose.model('user', userSchema); 

module.exports = user; 