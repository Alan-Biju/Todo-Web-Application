import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthProvider from './Context/AuthProvider';
import TodoProvider from './Context/TodoProvider';

ReactDOM.render(
	<AuthProvider>
		<TodoProvider>
			<App />
		</TodoProvider>
	</AuthProvider>,
	document.getElementById('root'),
);
