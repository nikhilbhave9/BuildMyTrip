const router = require('express').Router(); 
const { json } = require('express');
const mongoose = require('mongoose');

/* Calling the mongoose model we just created */
let hotel = require('../models/hotels.model.js'); 
// let userSecondary = require('../models/user_secondary.model');

/* Trigger the following when "http//www.website.com/" is called */
router.route('/hotels').get((req, res) => {
    /* A GET route that returns the list of all products from the MongoDB database */


    /* If found in the MongoDB */
    hotel.find()

        /* Return the products you got from the database in JSON format */ 
        .then(items => res.json(items))

        /* In case you hit an error */
        .catch(error => res.status(400).json("Error: " + error)); 
}); 

// =======================================================================

// ADD NEW HOTELS - INSOMNIA / POSTMAN 
// /* Trigger the following if "http//www.website.com/shop/add" is called */ 
// router.route('/add').post((req, res) => {

//     /* A POST route that adds a product to the database */

//     const newShop = new shop({
//         itemName: req.body.itemName, 
//         description: req.body.description, 
//         cost: Number(req.body.cost), 
//         totalRatings: 0,
//         avgRatings: 0,
//         ratings: new Array(), 
//         imageLink: req.body.imgLink, 
//         category: req.body.category
//     }); 

//     newShop.save()
//         .then(() => res.json("Item Added!"))
//         .catch(err => res.status(400).json("Error: " + err)); 
// }); 


// ADMIN ACCESS: DELETE A HOTEL
// /* Trigger the following if "http//www.website.com/shop/{id}" is called */ 
// router.route('/:id').delete((req, res) => {
//     /* A GET route that extracts the details of a product by its ID */

//     shop.findByIdAndDelete(req.params.id)
//         .then(() => res.json("Item Deleted Successfully"))
//         .catch(error => res.status(400).json("Error: " + error)); 
// });


// ADMIN ACCESS - UPDATE DETAILS OF HOTELS
// /* Trigger the following if "http//www.website.com/shop/update/{id}" is called */
// router.route('/update/:id').post((req, res) => {
//     /* A POST route that updates the details of the product given its ID */

//     shop.findById(req.params.id)
//         .then(item => {
//             /* Extracting details in JSON format */ 
//             item.itemName = req.body.itemName;
//             item.description = req.body.description;
//             item.cost = req.body.cost; 

//             item.save()
//                 .then(() => res.json("Item Updated Successfully"))
//                 .catch(error => res.status(400).json("Error: " + error))
//         })
//         .catch(error => res.status(400).json("Error: " + error))
// });


// =======================================================================

// INDIVIDUAL HOTEL PAGE
// /* Trigger the following if "http//www.website.com/shop/{id}" is called through get*/ 
// router.route('/products/:id')
//     .get((req, res) => {
//     /* A GET route that extracts the details of a product by its ID */

//         shop.findById(req.params.id)
//             .then(_item => res.json(_item))
//             .catch(error => res.status(400).json("Error: " + error)); 
//     });


// ================================================================

// RATING - V.IMP - USERS IN DATABASE OR NOT? ALLOW USERS TO RATE IF VALID USER VERIFIED USER

/* Trigger the following if "https://www.website.com/shop/products/{id}/rating is called through get*/   
// router.route('/products/:id/rating')
//     .get((req, res) => {

//         /* A get route that returns an array containing the ratings of the product */

//         shop.findById(req.params.id)
//             .then(_item => res.json(_item))
//             .catch(err => res.status(400).json("Error: " + err));
//     })


//     .post((req, res) => {
        
//         /* A post route that allows a user to post a rating for a product */

//         shop.findById(req.params.id)
//             .then(_item => {
//                 if (req.session.user){
//                     let sessEmail = req.session.user.email;
                    
//                     /* If the user has already rated the product */
//                     if (_item.ratings.find(_user => {return _user.email == sessEmail}))  
//                         res.json("Your Rating already exists")
                    
//                     else {
//                         /* Get the last digit of the form supplied rating */
//                         let rawRating = (req.body.yourRating.toString()).slice(-1); 
                        
//                         /* Update the average rating */
//                         _item.avgRatings = (_item.avgRatings * _item.totalRatings + parseFloat(rawRating)) / (_item.totalRatings + 1); 
//                         _item.totalRatings = _item.totalRatings + 1; 
//                         _item.ratings.push({"email": req.session.user.email, "rating": req.body.yourRating});
//                         _item.save()
//                             .then(() => res.json("Your Rating has been recorded"))
//                             .catch(err => res.status(500).json("Error: " + error))
//                     }
//                 }
//                 else {
//                     res.json("Sign in before rating"); 
//                 }
//             })
//             .catch(err => res.status(500).json("Error: " + error))
//     });

// ================================================================

// (CART) MIGHT BE USEFUL IN MY BOOKINGS/ WISHLIST

// router.route('/getProducts')
//     .post((req, res) => {
        
//         /* A POST route that accepts an array of product IDs and returns an array of JSON objects containing the 
//            details of each product */ 

//         let list = new Array(); 
//         for (const param in req.body.data) {
//             list.push(mongoose.Types.ObjectId(req.body.data[param])); 
//         }

//         shop.find({'_id': { $in: list}})
//             .then(_item => res.json(_item))
//             .catch(err => res.json(err));  

//     })

// ========================================================================

// VERIFIED USER (2)

// router.route('/products/:id/verified')
//     .get((req, res) => {
//         /* A POST route that tells the system whether a user is a verified buyer of the item he's rating */
//         let email = req.session.user.email; 

//         if (email){
//             userSecondary.findOne({email})
//                 .then(_data => {
//                     if(_data.purchases.indexOf(req.params.id) > -1)
//                         return res.json("Y");
//                     else
//                         return res.json("N"); 
//                 })
//                 .catch(err => res.json(err)); 
//         }
//         else {
//             res.json("User not signed in"); 
//         }
//     })


    

// router.route('/products/:id/verified')
//     .get((req, res) => {
//     /* A POST route that tells the system whether a user is a verified buyer of the item he's rating */
//     let email = req.session.user.email; 

//         if (email){
//             userSecondary.findOne({email})
//                 .then(_data => {
//                     if(_data.purchases.indexOf(req.params.id) > -1)
//                         return res.json("Y");
//                     else
//                         return res.json("N"); 
//                     })
//                 .catch(err => res.json(err)); 
//         }
//         else {
//             res.json("User not signed in"); 
//         }
//     })


// module.exports = router;