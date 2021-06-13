import React, { createContext, useEffect, useState, useContext } from 'react';
import db, { auth } from '../firebase';
import moment from 'moment';
export const authContext = createContext();
export const useAuth = () => {
	return useContext(authContext);
};

const AuthProvider = ({ children }) => {
	const [Auth, setAuth] = useState();
	const [load, setLoad] = useState(true);

	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password);
	};
	const logOut = () => {
		return auth.signOut();
	};
	const register = async (email, password, name) => {
		const res = await auth.createUserWithEmailAndPassword(email, password);
		if (res.user) {
			res.user
				.updateProfile({
					displayName: name,
				})
				.then(() => {
					db.collection(`${res.user.uid}`)
						.doc('Important')
						.collection(`todo-${res.user.uid}`)
						.doc('1')
						.set({
							message: `welcome ${res.user.displayName} 😀`,
							isDone: false,
							time: moment().format('h:mm:ss a'),
							date: moment().format('MMMM Do YYYY'),
							category: 'Important',
							color: '#ff5042',
						});
					db.collection(`${res.user.uid}`).doc('Personal').set({
						color: '#5EBA7D',
					});
				});
		}
	};
	const resetPassword = (email) => {
		return auth.sendPasswordResetEmail(email);
	};
	const updateProfile = (name, photo) => {
		const user = auth.currentUser;
		return user.updateProfile({
			displayName: name,
			photoURL: photo,
		});
	};

	const updateEmail = (email) => {
		const user = auth.currentUser;

		return user.updateEmail(email);
	};
	const deleteUser = () => {
		var user = auth.currentUser;

		return user.delete();
	};
	useEffect(() => {
		const isUser = auth.onAuthStateChanged((user) => {
			setAuth(user);
			setLoad(false);

			return isUser;
		});
	}, []);
	const value = {
		login,
		logOut,
		Auth,
		register,
		resetPassword,
		updateProfile,
		updateEmail,
		deleteUser,
	};
	return (
		<>
			<authContext.Provider value={value}>
				{!load && children}
			</authContext.Provider>
		</>
	);
};

export default AuthProvider;
