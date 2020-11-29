const bcrypt = require('bcryptjs');

const router = require('express').Router();
let user = require('../models/user.model');

/* To send emails using sendgrid */
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client("741110853489-3h88ghsg0u7qmjsjs6856g132dt9l5nk.apps.googleusercontent.com");


/* =======================Routes======================= */

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

    bcrypt.hash(password, 10, function (err, hash) {
        // Store hash in your password DB.

        const password = hash;
        const newUser = new user({ username: username, password: password, wishlist: new Array(), bookings: new Array() });

        newUser.save()
            .then(() => res.json("User added successfully!"))
            .catch(err => res.status(400).json("Error: " + err));
    });

    console.log(req.body);

});

/* Trigger the following if "http//www.website.com/users/login" is called */
router.route('/login')
    .post((req, res) => {
        /* A POST route that logs-in an existing user */

        /* Extracting values of email and raw password from the JSON object / HTML form */
        const username = req.body.username;
        const password = req.body.password;

        user.findOne({ username: username }, (err, valid_user) => {
            if (err) throw err;
            if (!valid_user) {
                return res.json("User Not Found!!!");
            }
            bcrypt.compare(password, valid_user.password, (err, result) => {
                if (err) throw err;
                if (result === true) {
                    req.session.user = valid_user;
                    console.log(req.session.user);
                    res.json(req.session.user);

                }
                else {
                    return res.json("Passwords do not match!!!");
                }
            });
        })

    });

router.route('/confirmbooking')
    .post((req, res) => {


        const msg = {
            to: req.body.email,
            from: 'akshat.singh_ug22@ashoka.edu.in',
            subject: '[BuildMyTrip Invoice] Confirming your hotel booking: ' + req.body.hotelName,
            text: 'Hello ' + req.body.billingName + ',',
            html: '<strong>Here is your email invoice for your stay at ' + req.body.hotelName + '</strong><br><br><table style="border: 1px solid black; width: 75%; font-family: ubuntu; font-size: 24px; background-color: grey"><tbody style="border: 1px solid black"><tr style="border: 1px solid black"><td style="border: 1px solid black">Name</td><td style="border: 1px solid black">' + req.body.billingName + '</td></tr><tr style="border: 1px solid black"><td style="border: 1px solid black">Room Tier</td><td style="border: 1px solid black">' + req.body.roomTier + '</td></tr><tr style="border: 1px solid black"><td style="border: 1px solid black">Total Cost with GST</td><td style="border: 1px solid black">' + req.body.totalCost + '</td></tr></tbody></table>Regards, <br><br>Akshat Singh<br>Team Build My Trip.',
        }
        console.log(msg);

        sgMail
            .send(msg)
            .then(() => res.json('Your invoice has been emailed to the email'))
            .catch((err) => res.json(err))


    });

router.route("/googlelogin")
    .post((req, res) => {
        const { tokenId } = req.body;

        client.verifyIdToken({ idToken: tokenId, audience: "741110853489-3h88ghsg0u7qmjsjs6856g132dt9l5nk.apps.googleusercontent.com" }).then(response => {

            const { email_verified, name, email } = response.payload;

            if (email_verified) {
                user.findOne({ username: email }, (err, valid_user) => {
                    if (err) throw err;
                    if (!valid_user) {
                        const username = email;
                        const password = name;

                        const newUser = new user({ username, password });

                        newUser.save()
                            .then(() => res.json("User added successfully!"))
                            .catch(err => res.status(400).json("Error: " + err));
                    }
                    else {
                        req.session.user = valid_user;
                        res.json(req.session.user);
                    }
                })
            }
        })


    })


router.route("/wishlist")
    .post((req, res) => {
        const { tokenId } = req.body;

        client.verifyIdToken({ idToken: tokenId, audience: "741110853489-3h88ghsg0u7qmjsjs6856g132dt9l5nk.apps.googleusercontent.com" }).then(response => {

            const { email_verified, name, email } = response.payload;

            if (email_verified) {
                user.findOne({ username: email }, (err, valid_user) => {
                    if (err) throw err;
                    if (!valid_user) {
                        const username = email;
                        const password = name;

                        const newUser = new user({ username, password });

                        newUser.save()
                            .then(() => res.json("User added successfully!"))
                            .catch(err => res.status(400).json("Error: " + err));
                    }
                    else {
                        req.session.user = valid_user;
                        res.json(req.session.user);
                    }
                })
            }
        })


    })



module.exports = router;
