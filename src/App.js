import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

// components
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Users from './components/Users';
import EditUser from './components/Users';
// context
import UserContextProvider from './contexts/UserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
	const history = useHistory();

	useEffect(() => {
		history.push('/login')
	})

  return (
    <div 
      className="App" 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        padding: '0em 10em 0 10em',
      }}
    >
				<UserContextProvider>
					<div>
						<Navbar />
						<Switch>
							<PrivateRoute 
								exact 
								path="/users" 
								isLoggedIn={isLoggedIn} 
								component={Users} 
							/>
							<PrivateRoute 
								exact 
								path="/users/:userId" 
								isLoggedIn={isLoggedIn} 
								component={EditUser} 
							/>
							<Route 
								exact 
								path="/login" 
								component={() => 
									!isLoggedIn
									? <Login setIsLoggedIn={setIsLoggedIn} />  
									: <Redirect to='/users' />
								}
							/>
							<Redirect to="/login" />
						</Switch>
					</div>
				</UserContextProvider>			
		</div>
  );
}

export default App;
