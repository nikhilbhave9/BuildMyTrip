const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

/* Schema for the database containing the primary details of a user */ 

const userSchema = new Schema({
    username: {type: String, required: true, unique: false, sparse: true},
    password: {type: String, required: true, unique: false, sparse: true}
}, {
    timestamps: true
});
 
const user = mongoose.model('user', userSchema); 

module.exports = user; 