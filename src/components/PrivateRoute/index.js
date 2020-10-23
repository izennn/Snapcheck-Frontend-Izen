import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, isLoggedIn, ...rest}) => {
	console.log("Got to a private route")
	console.log("Is logged in? " + isLoggedIn)
	return (
		<Route
			{...rest}
			render={(props) => (
				isLoggedIn ? 
				<Component {...props} />
				: <Redirect to="/login" />
			)}
		/>
	);
};

export default PrivateRoute;