<h1 align="center">E-Travel Web Platform </h1>
<h2>Course project #2 for CS-1202: Advanced Programming (Monsoon 2020) </h2>

## Contents
- [Main Features](#main-features)
- [Languages and Frameworks](#languages-and-frameworks)
- [Installation](#installation)
- [People](#people)
- [License](#license)


## Main Features 
- **Homepage:**
Homepage consists of a drop down menu on the left with anchor links to My Profile, Quick Trip, My Bookings and My Tracker. On the top is a search bar along with two options to navigate to your profile or to sign-in/sign-out.  

- **Hotels:**
Once you search up a particular hotel using the search bar, you can select it and it takes you to the particular hotel's page. There, you can view price, rate the hotels, glance at the hotel pictures, etc. It also shows the user the list of amenities which are available. Right at the bottom, there's also a recommendation feature that shows the user other hotel(s) that they might be interested. 

- **Register and Sign-in:**
The register and sign-in features are based on SHA-256 encryption algorithm. Clicking on the register button navigates you to a page where you can enter your email and password, and then confirm your password. This stores your details in the database. There is an option that tells you how strong your password is. 
The sign-in button redirects you to a similar page where you have to enter your registered email and password. After a successful login, you are redirected to the home page. Finally, the logout option at the top logs you out. 

- **My Tracker:**
My Tracker acts as one-stop for you to compare different hotels together, all at a singular glance. It it similar to a "wishlist". In your tracker, you can "Quick Book" a particular hotel. Or, if you do not wish to consider the hotel anymore, you can delete it from your tracker.

- **My Bookings:**
My Bookings is a "history" feature. It keeps a track of the previous bookings of the user, in case they wish to review or redo a particular booking. 


## Languages and Frameworks 
Main frameworks and languages used: 
#### Frontend
- React JS (Primary frontend framework)
- Material UI
- HTML 
- CSS, CSS Bootstrap

#### Backend 
- MongoDB Atlas
- Express 
- Mongoose  
- SHA-256

## Installation
- Make sure that the node package manager (npm) is installed on your device,
- Navigate to the backend folder on the terminal. Install the dependencies by entering 'npm i'. Start the nodejs server by entering 'node server' 
- Navigate to the frontend folder on a different terminal. Install the dependencies by entering 'npm i'. Start the react app by entering 'npm start'
- 'localhost:3000' should open up in your default browser. 

## People 
- Akshat Singh: 
https://github.com/Akshat-Singh
- Nikhil Bhave:
https://github.com/nikhilbhave9
- Vibodh Nautiyal 
https://github.com/vibodhnautiyal

## License
This project is [MIT](https://opensource.org/licenses/MIT) licensed. 
