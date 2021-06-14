import React from 'react';
import { useHistory } from 'react-router';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../../Context/AuthProvider';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const DropDown = ({ state }) => {
	// eslint-disable-next-line no-unused-vars
	const [drop, setDrop] = state;
	const history = useHistory();
	const { Auth, logOut } = useAuth();
	const signOut = async () => {
		try {
			await logOut();
			setDrop(false);
			history.push('/login');
		} catch (error) {
			console.log(error);
		}
	};
	const activeStyle = {
		textDecoration: 'line-through',
		color: '#b1a3a3',
	};
	return (
		<>
			<DropDownContainer onClick={() => setDrop(false)}>
				<ListItem>{Auth && Auth.displayName}</ListItem>
				<ListItem>
					<Links to='/Profile' activeStyle={activeStyle}>
						Profile
					</Links>
				</ListItem>
				<ListItem>
					<Links to='/Edit' activeStyle={activeStyle}>
						Edit
					</Links>
				</ListItem>

				<ListItem onClick={signOut}>
					sign Out <LogoutIcon />
				</ListItem>
			</DropDownContainer>
		</>
	);
};

export default DropDown;
const MoveDown = keyframes`
from{
    opacity: 0;
   height:0;
}
to{
    opacity: 1;
    height:220px;
    
}
`;

export const DropDownContainer = styled.div`
	position: absolute;
	top: 60px;
	right: 5px;
	background-color: #f5f5f5;
	width: 220px;
	height: 220px;
	border-radius: 5px;
	box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
		rgba(17, 17, 26, 0.05) 0px 8px 32px;
	animation: 1s ${MoveDown} cubic-bezier(0.51, 0.92, 0.24, 1.15);
	padding: 10px;
	&::after {
		content: '';
		width: 30px;
		height: 30px;
		position: absolute;
		background-color: inherit;
		position: absolute;
		top: -15px;
		right: 10px;
		transform: rotate(45deg);
	}
`;

const ListItem = styled.p`
	font-family: 'Raleway', sans-serif;
	width: 100%;
	height: 40px;
	color: #000000;
	letter-spacing: 1px;
	font-weight: 500;
	font-size: 0.9rem;
	padding: 5px;
	white-space: nowrap;
	text-transform: capitalize;
	text-align: left;
	display: flex;
	align-items: center;
	padding-left: 1rem;
	border-bottom: 1px solid #b6b8b960;
	margin-top: 5px;
	cursor: pointer;
	transition-duration: 0.3s;

	&:hover {
		background-color: #dddddd;
		text-decoration: line-through;
		transform: scale(0.97);
	}
	&:first-child {
		background-color: transparent;
		transform: scale(1);
		text-decoration: none;
	}
	&:last-child {
		display: flex;
		align-items: center;
		justify-content: space-between;
		&:hover {
			text-decoration: none;
			background-color: #fb3640f2;
			color: white;
		}
	}
`;
const LogoutIcon = styled(RiLogoutCircleRLine)`
	margin-right: 15px;
`;
const Links = styled(NavLink)`
	text-decoration: none;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: inherit;
`;
