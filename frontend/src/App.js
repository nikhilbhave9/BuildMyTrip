import './App.css';
import Homepage from './templates/Homepage'; 
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"; 
import ViewHotels  from './templates/ViewHotels'; 
import Navbar from './components/Navbar.js'
import LoginPage from './templates/LoginPage'; 
import RegisterPage from './templates/RegisterPage'; 
import UserProfile from './templates/UserProfile';
import UserBookings from './templates/UserBookings';
import HotelTile from './components/HotelTile';
import DisplayHotels from './templates/ViewHotels'
import QuickBook from './templates/QuickBook'
import BookingConfirmation from './templates/BookConf'; 
import UserTracker from './templates/UserTracker'; 
import Signout from './templates/Signout'; 

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path='/signout'>
						<Signout/>	
					</Route> 
					<Route path='/bookingconfirmation'>
						<Navbar/>
						<BookingConfirmation/>
					</Route>
					<Route path='/usertracker'>
						<Navbar/>
						<UserTracker/>
					</Route>
					<Route path='/quickbook/:id'>
						<Navbar/>
						<QuickBook/>
					</Route>
					<Route path='/login'>
						<Navbar/>
						<LoginPage/>
					</Route>
					<Route path='/register'> 
						<Navbar/>
						<RegisterPage/>
					</Route>
					<Route path='/userprofile'>
						<Navbar/>
						<UserProfile/>
					</Route>
					<Route path='/userbookings'>
						<Navbar/>
						<UserBookings/>
					</Route>
					<Route path='/viewhotels/'>
						<Navbar/>
						<DisplayHotels/>
					</Route>
					<Route path='/'> 
						<Navbar/>
						<Homepage/>
					</Route>

				</Switch>
			</div>
		</Router>
  	);
}

export default App;
