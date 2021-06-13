import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { MdClose } from 'react-icons/md';
import { FiAlertTriangle } from 'react-icons/fi';
import Input from '../Login/Input';
import { useAuth } from '../../Context/AuthProvider';
import ErrorMessage from '../ReUseable/ErrorMessage';


const Delete = () => {
	const [message, setMessage] = useState(false);

	const { Auth, deleteUser } = useAuth();
	const [email, setEmail] = useState('');
	const [popup, setPopup] = useState(false);
	const DeleteAccount = async () => {
        if (Auth.email === email) {
            try {
                
                await deleteUser();
                
			} catch {
				setMessage('Plz Try again later');
			}
		} else {
			console.log('no');
			setMessage('Email is Incorrect ');
		}
	};
	return (
		<>
			<DeleteContainer>
				<DeleteInfo>
					<TextZone>
						<h1>Delete account</h1>
						<p>
							Once you delete your account, there is no going back. Please be
							certain.
						</p>
					</TextZone>
                    <DeleteButton onClick={ () => {
                        setPopup(!popup);
                        setEmail('');
                        setMessage('')

                    } }>
						Delete your account
					</DeleteButton>
				</DeleteInfo>
			</DeleteContainer>

			{popup && (
				<DeletePopUp>
					{message && <ErrorMessage state={[message, setMessage]} />}
					<ConfirmBox>
						<TextUpperZone>
							<TextClose>
								<p>Are you sure you want to do this?</p>
								<MdClose
									style={{ cursor: 'pointer' }}
									onClick={() => setPopup(!popup)}
								/>
							</TextClose>
							<TextWaring>
								<p>
									<FiAlertTriangle size={18} style={{ margin: '0 5px' }} />
									This is extremely important.
								</p>
							</TextWaring>
						</TextUpperZone>
						<TextLowerZone>
							<Text>
								We will immediately delete all of your details, along with all
								of your todos, data, photos,and other personal info.
							</Text>
							<InputZone>
								<p>To verify, type your Email below:</p>
								<Input type='text' label='Email' state={[email, setEmail]} />
							</InputZone>
						</TextLowerZone>
						<Conform onClick={DeleteAccount}>Delete this Account</Conform>
					</ConfirmBox>
				</DeletePopUp>
			)}
		</>
	);
};

export default Delete;
const DeleteContainer = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const DeleteInfo = styled.div`
	width: 65%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-family: 'Roboto', sans-serif;
	@media (max-width: 450px) {
		flex-direction: column;
		text-align: center;
	}
`;
const TextZone = styled.div`
	h1 {
		font-size: 1.3rem;
		font-weight: 600;
		letter-spacing: 1px;
		white-space: nowrap;
		padding-bottom: 5px;
		transition: color 0.9s ease;
		color: ${(prop) => prop.theme.MainFontColor};
		@media (max-width: 600px) {
			padding-bottom: 10px;
			font-size: 1rem;
		}
	}
	p {
		font-size: 0.7rem;
		transition: color 0.9s ease;
		color: ${(prop) => prop.theme.secondaryFontColor};
		@media (max-width: 600px) {
			font-size: 0.5rem;
		}
	}
	@media (max-width: 600px) {
		padding: 10px;
		margin-bottom: 10px;
	}
`;
const DeleteButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 180px;
	height: 30px;
	color: #cb2431;
	border: none;
	outline: none;
	font-size: 0.9rem;
	font-weight: 500;
	padding: 5px;
	border: 1px solid #d8d3d3;
	background-color: #ffffff;
	cursor: pointer;
	transition-duration: 0.5s;
	white-space: nowrap;
	border-radius: 5px;
	&:hover {
		background-color: #cb2431;
		color: #ffffff;
	}
	@media (max-width: 360px) {
		margin-bottom: 10px;
	}
`;
const DeletePopUp = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #000000a2;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 100;
`;
const FadeIn = keyframes`
from{
    opacity: 0;
    transform: scale(0.8);
}
to{
    opacity: 1;
    transform: scale(1);

}
`;
const ConfirmBox = styled.div`
	width: 300px;
	min-height: 400px;
	background-color: #ffffff;
	border-radius: 5px;
	margin: 10px;
	animation: 0.8s ${FadeIn} ease;
	@media (max-width: 460px) {
		width: 90%;
		height: 65%;
	}
`;
const TextUpperZone = styled.div``;
const TextClose = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-family: 'Raleway', sans-serif;
	width: 100%;
	height: 60px;
	padding: 10px;
	p {
		font-size: 14px;
		font-weight: 600;
		color: #2e3236;
	}
`;
const TextWaring = styled(TextClose)`
	background-color: #ffe4e7;
	border-top: 1px solid #db989d;
	border-bottom: 1px solid #db989d;

	P {
		color: #7a5e60;
		font-size: 12px;
		display: flex;
		align-items: center;
	}
`;
const TextLowerZone = styled.div`
	padding: 10px;
`;
const Text = styled.p`
	font-family: 'Roboto', sans-serif;
	font-size: 0.7rem;
	line-height: 20px;
	letter-spacing: 1px;
	color: #585b5e;
	@media (max-width: 260px) {
		font-size: 0.5rem;
	}
`;

const InputZone = styled.div`
	margin-top: 20px;
	width: 100%;
	margin-bottom: 10%;
	p {
		font-family: 'Raleway', sans-serif;
		font-size: 0.7rem;
		line-height: 20px;
		font-weight: 600;
		letter-spacing: 1px;
		color: #2d2e30;
	}
	@media (max-width: 260px) {
		margin-bottom: 1%;
	}
`;
const Conform = styled(DeleteButton)`
	margin: 0 auto;
`;
