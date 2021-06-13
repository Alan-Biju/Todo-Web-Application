import React, { useState } from 'react';
import { Form, InputBox, Button, CreateText, Message } from '../Login/Login';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import Input from '../Login/Input';
const ResetPassword = () => {
	const { resetPassword } = useAuth();
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setMessage('');
			await resetPassword(email);
			setEmail('');
			setMessage('Check your inbox for further instructions');
		} catch (error) {
			console.log('errror' + error);
			setMessage('Sorry somthing went worng');
		}
	};
	return (
		<>
			<Form onSubmit={handleSubmit}>
				<h1>Reset password</h1>
				<Message>{message ? message : <br />}</Message>
				<InputBox>
					<Input type='text' label='Email' state={[email, setEmail]} />
				</InputBox>
				<Button type='submit'>Reset</Button>
				<Link to='/Register' style={{ textDecoration: 'none' }}></Link>
				<Link to='/Login' style={{ textDecoration: 'none' }}>
					<CreateText>Login Here !</CreateText>
				</Link>
			</Form>
		</>
	);
};

export default ResetPassword;
