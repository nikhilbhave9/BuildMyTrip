const bcrypt = require('bcryptjs');

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

 // Trigger the following if "http//www.website.com/users/register" is called 
 router.route('/register').post((req, res) => {
   //  A POST router that registers a new user /*
    const username = req.body.username; 
    const password = req.body.password;

    bcrypt.hash(password, 10, function(err, hash) {
        // Store hash in your password DB.
        
       const password = hash; 
       const newUser = new user({username, password});

       newUser.save()
        .then(() => res.json("User added successfully!"))
        .catch(err => res.status(400).json("Error: " + err));
    });

    console.log(req.body);
        
}); 

module.exports = router;
