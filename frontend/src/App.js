import './App.css';
import Homepage from './templates/Homepage'; 
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"; 
import ViewHotels  from './templates/ViewHotels'; 
import Navbar from './components/Navbar.js'
import LoginPage from './templates/LoginPage'; 
import RegisterPage from './templates/RegisterPage'; 
import UserProfile from './templates/UserProfile';
import HotelTile from './components/HotelTile';
import DisplayHotels from './templates/ViewHotels'
import QuickBook from './templates/QuickBook'


function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
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
						Hello World
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
