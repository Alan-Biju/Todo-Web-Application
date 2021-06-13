import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import React, { Suspense, lazy, useState, useEffect } from 'react';
import Header from './components/Header.js/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ResetPassword from './components/ResetPassword.js/ResetPassword';
import ProtectedRoute from './ProtectedRoute';
import Loading from './components/ReUseable/Loading';
import storage from 'local-storage-fallback';
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './Theme';
const Home = lazy(() => import('./components/Home/Home'));
const Edit = lazy(() => import('./components/Edit/Edit'));
const Profile = lazy(() => import('./components/Profile/Profile'));
function App() {
	const InintialTheme = () => {
		 const Theme = storage.getItem('Theme');
		return Theme === 'true' ? true : false;
	};
	const [isDarkMode, setIsDarkMode] = useState(InintialTheme());
	useEffect(() => {
		storage.setItem('Theme', isDarkMode);
		
	}, [isDarkMode]);
	return (
		<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
			<AppContainer>
				<Router>
					<Header dark={isDarkMode} setdark={setIsDarkMode} />
					<Switch>
						<Route path='/login' exact>
							<Login />
						</Route>
						<Route path='/Register' exact>
							<Register />
						</Route>
						<Route path='/Reset' exact>
							<ResetPassword />
						</Route>
						<Suspense fallback={<Loading />}>
							<ProtectedRoute path='/' Components={Home} exact />
							<ProtectedRoute path='/Edit' Components={Edit} exact />
							<ProtectedRoute path='/Profile' Components={Profile} exact />
						</Suspense>
						<Route path='*'>
							<Login />
						</Route>
					</Switch>
				</Router>
			</AppContainer>
		</ThemeProvider>
	);
}

export default App;
const AppContainer = styled.div`
	min-height: 100vh;
	transition: background-color 0.8s ease;
	background-color: ${(prop) => prop.theme.background};
`;
