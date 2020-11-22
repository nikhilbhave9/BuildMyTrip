const router = require('express').Router();
let user = require('../models/user.model');

/* Trigger the following when "http//www.website.com/users/" is called */
router.route('/').get((req, res) => {
    /* A GET route that returns the list of all users from the MongoDB database */

    /* If users are found in the MongoDB */
    user.find()

        /* Return the users you got from the database in JSON format */ 
        .then(users => res.json(users))

        /* In case you hit an error */
        .catch(error => res.status(400).json("Error: " + error)); 
}); 

/* Trigger the following if "http//www.website.com/users/register" is called */
router.route('/register').post((req, res) => {
    /* A POST router that registers a new user */
    const name = req.body.name; 
    const email = req.body.email; 

    const newUser = new user({name, email});

    newUser.save()
        .then(() => res.json('User added successfully!!'))
        .catch(err => res.status(400).json('Error: ' + err));
        
});

module.exports = router;
