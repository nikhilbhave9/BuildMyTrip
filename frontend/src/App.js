import './App.css';
import Header from './components/Header'; 
import Homepage from './templates/Homepage'; 
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"; 
import MainView  from './templates/ViewHotels'; 


function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path='/viewHotels/:country' component={MainView}/>
					<Route path='/viewHotels/' component={MainView}/>
					<Route path='/'> 
						<Header/>
						<Homepage/>
					</Route>

				</Switch>
			</div>
		</Router>
  	);
}

export default App;
