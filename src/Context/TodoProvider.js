import React, { createContext, useContext, useState, useEffect } from 'react';
import db from '../firebase';
import moment from 'moment';
import { useAuth } from './AuthProvider';
const TodoContext = createContext();
export const useTodo = () => {
	return useContext(TodoContext);
};
const TodoProvider = ({ children }) => {
	const [todoData, setTodoData] = useState([]);
	const [categorytodoData, setCategorytodoData] = useState([]);
	const [category, setCategory] = useState([]);
	const [titleCategory, setTitleCategory] = useState(''); ///---------category title--------
	const [switchTodo, setSwitchTodo] = useState(''); /////--------------------switch-------
	const [todayItem, setTodayItem] = useState([]); //---------today list----------------
	const [notification, setNotification] = useState([]);
	const { Auth } = useAuth();
	// ---------------------------------------------All Todo value-------------------

	const data = () => {
		try {
			db.collectionGroup(`todo-${Auth.uid}`).onSnapshot((res) => {
				const dataArr = [];
				res.forEach((data) => {
					dataArr.push({ ...data.data(), id: data.id });
				});
				dataArr.sort( (a, b)=> {
					return new Date(b.date) - new Date(a.date);
				});
				setTodoData(dataArr);
			});
		} catch (error) {
			console.log('from todoAuth 🐱‍🐉' + error);
		}
	};
	//-------------------------------------categoryList------------------
	const List = () => {
		try {
			db.collection(`${Auth.uid}`).onSnapshot((res) => {
				setCategory([]);
				res.forEach((data) => {
					return setCategory((prev) =>
						setCategory([...prev, { ...data.data(), id: data.id }]),
					);
				});
			});
		} catch (error) {
			console.log('from todoAuth 🐱‍🐉' + error);
		}
	};

	useEffect(() => {
		if (Auth) {
			data();
			List();
			today();
			displayNotification();
		}
		return () => {
			data();
			setCategory([]);
			List();
			setTodoData([]);
			today();
			displayNotification();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [Auth]);
	// --------------------------------------------------setting category Item-------- /
	const setCategoryItem = async (item, color) => {
		try {
			await db.collection(`${Auth.uid}`).doc(`${item}`).set({
				color: color,
			});
		} catch {
			console.log('error');
		}
	};
	//-----------------------------------------Adding Todo to fire base---------------------------

	const AddTodo = async (category, message, date) => {
		try {
			await db
				.collection(`${Auth.uid}`)
				.doc(category.id)
				.collection(`todo-${Auth.uid}`)
				.add({
					message: message,
					isDone: false,
					time: moment().format('h:mm:ss a'),
					date: date,
					category: category.id,
					color: category.color,
				});
		} catch {
			console.log('add todo');
		}
	};
	///---------------------------------------------------------CategoryDelete---------------

	const categoryDelete = (category) => {
		try {
			db.collection(`${Auth.uid}/${category}/todo-${Auth.uid}`).onSnapshot(
				(res) => {
					res.forEach((data) => {
						db.collection(`${Auth.uid}/${category}/todo-${Auth.uid}`)
							.doc(data.id)
							.delete()
							.then(() => {
								db.collection(`${Auth.uid}`).doc(`${category}`).delete();
							});
					});
					db.collection(`${Auth.uid}`).doc(`${category}`).delete();
				},
			);
		} catch (e) {
			console.log('delter not workig' + e);
		}
	};
	////----------------------------------------------------Todo check-------------------------
	const isDone = async (category, id, isDone) => {
		try {
			await db
				.collection(`${Auth.uid}/${category}/todo-${Auth.uid}`)
				.doc(`${id}`)
				.update({
					isDone: !isDone,
				});
		} catch (e) {
			console.log(e);
		}
	};

	///-------------------------------------------------------TodoDelete-----------------------

	const deleteTodo = async (category, id) => {
		try {
			await db
				.collection(`${Auth.uid}/${category}/todo-${Auth.uid}`)
				.doc(`${id}`)
				.delete();
		} catch (e) {
			console.log(e);
		}
	};

	//----------------------------------------------------catagoryfetch--------------------
	const categoryDisplay = (category) => {
		try {
			setTitleCategory(category);
			db.collection(`${Auth.uid}/${category}/todo-${Auth.uid}`).onSnapshot(
				(res) => {
					setCategorytodoData([]);
					res.forEach((data) => {
						setCategorytodoData((prev) => {
							setCategorytodoData([...prev, { ...data.data(), id: data.id }]);
						});
						setTitleCategory(category);
					});
				},
			);
		} catch (e) {
			console.log(e + 'error from cf');
		}
	};
	////--------------------------------Notifications-----------------------------
	const displayNotification = () => {
		try {
			db.collectionGroup(`todo-${Auth.uid}`)
				.limit(2)
				.onSnapshot((res) => {
					setNotification([]);
					res.forEach((data) => {
						if (data.data().date === moment().format('YYYY-MM-DD')) {
							setNotification((prev) => {
								setNotification([...prev, { ...data.data(), id: data.id }]);
							});
						}
					});
				});
		} catch (e) {
			console.log('NO Notification sorry' + e);
		}
	};

	///----------------------------------today fetch-----------------------------

	const today = () => {
		try {
			db.collectionGroup(`todo-${Auth.uid}`).onSnapshot((res) => {
				setTodayItem([]);
				res.forEach((data) => {
					if (data.data().date === moment().format('YYYY-MM-DD')) {
						setTodayItem((prev) => {
							setTodayItem([...prev, { ...data.data(), id: data.id }]);
						});
					}
				});
			});
		} catch (error) {
			console.log('from todoAuth 🐱‍🐉' + error);
		}
	};

	//------------------------------------
	const value = {
		todoData,
		category,
		setCategoryItem,
		AddTodo,
		categoryDisplay,
		deleteTodo,
		data,
		categorytodoData,
		titleCategory,
		categoryDelete,
		isDone,
		switchTodo,
		setSwitchTodo,
		todayItem,
		today,
		displayNotification,
		notification,
	};
	return (
		<>
			<TodoContext.Provider value={value}>{children}</TodoContext.Provider>
		</>
	);
};

export default TodoProvider;
