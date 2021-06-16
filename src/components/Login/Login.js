import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import Input from './Input';
const Login = () => {
	const { login } = useAuth();
	const history = useHistory();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setMessage('');
			await login(email, password);
			setEmail('');
			setPassword('');
			history.push('/');
		} catch (e) {
			console.log('errror' + e);
			setMessage(e.message);
		}
	};
	return (
		<>
			<Form onSubmit={handleSubmit} autocomplete='off'>
				<h1>Login</h1>
				<Message>{message ? message : ''}</Message>
				<InputBox>
					<Input type='text' label='Email' state={[email, setEmail]} />
					<Input
						type='password'
						label='Password'
						state={[password, setPassword]}
					/>
				</InputBox>
				<Link
					to='/Reset'
					style={{ textDecoration: 'none', float: 'left', width: '100%' }}>
					<p>Forget password ?</p>
				</Link>
				<Button type='submit'>Login</Button>
				<Link to='/Register' style={{ textDecoration: 'none' }}>
					<CreateText>Create account ? Sign up</CreateText>
				</Link>
			</Form>
		</>
	);
};

export default Login;

export const Form = styled.form`
	background-image: url('/ri.svg');
	background-size: 85% 150%;
	background-repeat: no-repeat;
	background-position: 30px 20px;
	transition: background-color 0.8s ease;
	background-color: ${(prop) => prop.theme.MainBackground};
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 350px;
	min-height: 500px;
	max-height: 500px;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-around;
	padding: 45px;
	border-radius: 5px;
	box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
	h1 {
		font-family: 'Raleway', sans-serif;
		letter-spacing: 1px;
		font-weight: 600;
		transition: color 0.9s ease;
		color: ${(prop) => prop.theme.MainFontColor};
		@media (max-width: 260px) {
			font-size: 1.1rem;
		}
	}
	p {
		font-size: 0.6rem;
		width: 100%;
		text-align: right;
		font-family: 'Raleway', sans-serif;
		transition: color 0.9s ease;
		color: ${(prop) => prop.theme.MainFontColor};
		font-weight: 600;
		letter-spacing: 1px;
	}
	@media (max-width: 400px) {
		width: 90%;
		padding: 30px;
	}
	@media (max-width: 320px) {
		width: 90%;
		min-height: 400px;
		max-height: 400px;
		padding: 15px;
		margin-top: 20px;
	}
`;
export const InputBox = styled.div`
	width: 100%;
	height: 120px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	@media (max-width: 350px) {
		height: 100px;
	}
`;
export const Button = styled.button`
	width: 150px;
	display: inline-block;
	padding: 0.7em 1.7em;
	margin: 0 0.3em 0.3em 0;
	border-radius: 0.2em;
	font-family: 'Raleway', sans-serif;
	font-weight: 500;
	letter-spacing: 1px;
	color: #ffffff;
	background-color: #008fc4;
	text-align: center;
	border: none;
	outline: none;
	cursor: pointer;
	&:active {
		box-shadow: inset 0 0.6em 2em -0.3em rgba(0, 0, 0, 0.15),
			inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
	}
`;
export const CreateText = styled.h2`
	width: 100%;
	font-size: 0.65rem;
	transition: color 0.9s ease;
	color: ${(prop) => prop.theme.MainFontColor};
	text-align: center;
	letter-spacing: 1px;
	font-family: 'Raleway', sans-serif;
	font-weight:bold;
	text-transform: uppercase;
`;
export const Message = styled.h6`
	text-align: center;
	width: 100%;
	letter-spacing: 1px;
	line-height: 18px;
	font-family: 'Roboto', sans-serif;
	text-transform: capitalize;
	color: #f54748;
	font-weight: 600;
`;
