import './App.css';
import Header from './components/Header'; 
import Homepage from './templates/Homepage'; 
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"; 
import MainView  from './templates/ViewHotels'; 
import Navbar from './components/Navbar.js'
import LoginPage from './templates/LoginPage'; 
import RegisterPage from './templates/RegisterPage'; 


function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path='/login'>
						<Navbar/>
						<LoginPage/>
					</Route>
					<Route path='/register'> 
						<Navbar/>
						<RegisterPage/>
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
