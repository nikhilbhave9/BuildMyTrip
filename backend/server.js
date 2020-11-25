const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app we are connecting to
        credentials: true,
    })
);

/* Session attributes */ 
app.use(session({
    secret: 'secretcode',
    cookie: {
        path    : '/',
        httpOnly: false,
        maxAge  : 24*60*60*1000
    }
}));



const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})