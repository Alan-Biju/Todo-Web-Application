import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FiEdit } from 'react-icons/fi';
import { useAuth } from '../../Context/AuthProvider';
import Delete from './Delete';
import ErrorMessage from '../ReUseable/ErrorMessage';
import Profilecard from '../ReUseable/Profilecard';

const Edit = () => {
	const history = useHistory();
	const { Auth, updateProfile, updateEmail } = useAuth();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [photo, setPhoto] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		setName(() => Auth.displayName || '');
		setEmail(() => Auth.email || '');
		setPhoto(() => Auth.photoURL || '');
	}, [Auth]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage('');
		try {
			await updateProfile(name, photo);
			await updateEmail(email);
		} catch (e) {
			console.log(e);
			console.log('no update');
			if (
				e.message ===
				'This operation is sensitive and requires recent authentication. Log in again before retrying this request.'
			) {
				setMessage('Log in again before retrying this request');
			} else {
				setMessage(e.message);
			}
		}

		history.push('/Edit');
	};
	return (
		<>
			{message && <ErrorMessage state={[message, setMessage]} />}
			<EditContanier>
				<Profilecard />
				<EditBody>
					<Form onSubmit={handleSubmit}>
						<InputBox>
							<label htmlFor='name'>Name</label>
							<input
								type='text'
								name='name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</InputBox>
						<InputBox>
							<label htmlFor='email'>Email</label>
							<input
								type='email'
								name='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</InputBox>
						<InputBox>
							<label htmlFor='photo'>Photo Url</label>
							<input
								type='text'
								name='photo'
								value={photo}
								onChange={(e) => setPhoto(e.target.value)}
							/>
							<p>(optional) provide image Url</p>
						</InputBox>
						<Editbutton type='submit'>
							Edit <FiEdit size={14} style={{ marginLeft: '10px' }} />
						</Editbutton>
					</Form>
				</EditBody>
			</EditContanier>
			<Delete />
		</>
	);
};

export default Edit;
const EditContanier = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const EditBody = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Form = styled.form`
	width: 100vw;
	height: 60vh;
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-direction: column;
	font-family: 'Roboto', sans-serif;
	label {
		font-size: 0.9rem;
		transition: color 0.9s ease;
		color: ${(prop) => prop.theme.MainFontColor};
	}
	input {
		font-family: 'Roboto', sans-serif;
		width: 330px;
		padding: 8px;
		outline: none;
		border: none;
		margin-top: 10px;
		margin-bottom: 5px;
		border: 1px solid #c0c0c0;
		border-radius: 5px;
		@media (max-width: 360px) {
			width: 90vw;
		}
	}
	input[type='text'],
	input[type='email'],
	input[type='number'] {
		padding: 8px;
		font-size: 17px;
		font-family: 'Raleway', sans-serif;
	}
	@media (max-width: 360px) {
		height: 80vh;
	}
`;
const InputBox = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-direction: column;
	p {
		font-size: 0.5rem;
		letter-spacing: 1px;
		transition: color 0.9s ease;
		color: ${(prop) => prop.theme.secondaryFontColor};
	}
`;
const Editbutton = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100px;
	height: 30px;
	color: #ffffff;
	border: none;
	outline: none;
	font-size: 0.9rem;
	font-weight: 500;
	padding: 5px;
	cursor: pointer;
	background-color: #ffffff;
	transition-duration: 0.5s;
	border-radius: 5px;
	background-color: #00917c;

	&:hover {
		transform: scale(0.98);
		background-color: #067967;
	}
`;
