import React, { useState } from 'react';
import styled from 'styled-components';

import { Link, useHistory } from 'react-router-dom';
import { Form, InputBox, Button, Message } from '../Login/Login';
import { useAuth } from '../../Context/AuthProvider';
import Input from '../Login/Input';
const Register = () => {
	const { register } = useAuth();
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setMessage('');
			await register(email, password, name);
			setEmail('');
			setPassword('');
			setName('');
			history.push('/');
		} catch (error) {
			setMessage(error.message);
		}
	};
	return (
		<>
			<Forms onSubmit={handleSubmit}>
				<h1> Sign Up</h1>
				<Message>{message ? message : <br />}</Message>

				<InputBoxs>
					<Input type='text' label='Name' state={[name, setName]} />
					<Input type='text' label='Email' state={[email, setEmail]} />

					<Input
						type='password'
						label='Password'
						state={[password, setPassword]}
					/>
				</InputBoxs>
				<Buttons type='submit'>Sign up</Buttons>
				<Link to='/Login' style={{ textDecoration: 'none' }}>
					<CreateText>Login Here !</CreateText>
				</Link>
			</Forms>
		</>
	);
};

export default Register;

const Forms = styled(Form)`
	h1 {
		margin-top: 20px;
	}
`;
const InputBoxs = styled(InputBox)`
	height: 200px;
	@media (max-width: 350px) {
		height: 150px;
	}
`;
const Buttons = styled(Button)``;
const CreateText = styled.h2`
	width: 100%;
	font-size: 0.65rem;
	transition: color 0.9s ease;
	color: ${(prop) => prop.theme.MainFontColor};
	text-align: center;
	letter-spacing: 1px;
	font-family: 'Raleway', sans-serif;
	font-weight: bold;
	text-transform: uppercase;
`;
