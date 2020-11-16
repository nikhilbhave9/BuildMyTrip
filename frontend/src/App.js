import './App.css';
import Header from './components/Header'; 
import Homepage from './templates/Homepage'; 
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"; 
import MainView  from './templates/ViewHotels'; 
import Navbar from './components/Navbar.js'

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
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
