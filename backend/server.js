const express = require('express');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');  // Used to allow OR restrict access depending on where HTTP request was initiated 
const mongoose = require('mongoose');  // Better workflow with MongoDB

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app we are connecting to
        credentials: true,
    })
);

app.options('*', cors());


/* Session attributes */ 
app.use(session({
    secret: 'secretcode',
    cookie: {
        path    : '/',
        httpOnly: false,
        maxAge  : 24*60*60*1000
    }
}));


// ==========================================================================
// Connect Node server to MongoDB database via MongoDB Atlas

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// ==========================================================================
// Add routes 

const usersRouter = require('./routes/users');
const hotelsRouter = require('./routes/hotels');

app.use('/users', usersRouter);
app.use('/hotels', hotelsRouter);

// ==========================================================================
// Running on port 5000

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})