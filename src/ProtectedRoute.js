import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './Context/AuthProvider';
const ProtectedRoute = ({ Components, ...rest }) => {
	const { Auth } = useAuth();
	return (
		<Route 
			{...rest}
			render={() => {
				return Auth ? <Components  /> : <Redirect to='/login' />;
			} }
		/>
	);
};

export default ProtectedRoute;
