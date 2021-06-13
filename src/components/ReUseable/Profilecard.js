import React from 'react';
import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';

const Profilecard = () => {
	const { Auth } = useAuth();

	return (
		<>
			<EditHeadContainer>
				<LeftSide>
					<img
						src={`${Auth.photoURL}` || 'Alt.png'}
						alt='person'
						onError={(e) => {
							e.target.src = 'Alt.png';
						}}
					/>
					<Text>
						<h2>{Auth && Auth.displayName}</h2>
						<p>Your personal account</p>
					</Text>
				</LeftSide>
				<Back to='/'>
					<p>
						Go Home <FiArrowRight />
					</p>
				</Back>
			</EditHeadContainer>
		</>
	);
};

export default Profilecard;
const EditHeadContainer = styled.div`
	width: 100%;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	@media (max-width: 360px) {
		flex-direction: column;
	}
`;
const LeftSide = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}
`;
const Text = styled.div`
	margin-left: 15px;
	font-family: 'Raleway', sans-serif;

	h2 {
		font-size: 1rem;
		text-transform: capitalize;
		transition: color 0.9s ease;
		color: ${(prop) => prop.theme.MainFontColor};
		@media (max-width: 360px) {
			font-size: 0.7rem;
		}
	}
	p {
		font-size: 0.7rem;
		font-weight: 400;
		line-height: 20px;
		transition: color 0.9s ease;
		color: ${(prop) => prop.theme.secondaryFontColor};
		@media (max-width: 360px) {
			font-size: 0.5rem;
			white-space: nowrap;
		}
	}
`;
const Back = styled(Link)`
	text-decoration: none;
	width: 130px;
	height: 30px;
	border: 1px solid #008fc4;
	display: flex;
	align-items: center;
	justify-content: center;
	transition-duration: 0.5s;
	border-radius: 5px;

	&:hover {
		background-color: #008fc4;
		p {
			color: white;
		}
	}
	p {
		font-family: 'Raleway', sans-serif;
		color: #008fc4;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 70%;
		font-weight: 500;
		font-size: 0.9rem;
		white-space: nowrap;
		transition: inherit;
	}
	@media (max-width: 360px) {
		width: 100px;
		margin-top: 10px;
	}
`;
