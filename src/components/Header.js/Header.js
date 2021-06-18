import React, { useState } from 'react';
import styled from 'styled-components';
import { MdSettings, MdNotificationsNone } from 'react-icons/md';
import { BsDot } from 'react-icons/bs';
import DropDown from './DropDown';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import NavBarIcon from '../ReUseable/NavBarIcon';
import DarkMoodToggle from '../ReUseable/DarkMoodToggle';
import NotificationsDrop from './NotificationsDrop';
import { useTodo } from '../../Context/TodoProvider';
const Header = ({ dark, setdark }) => {
	const { Auth } = useAuth();
	const { notification, displayNotification } = useTodo();
	const [drop, setDrop] = useState(false);
	const [notifications, setNotifications] = useState(false);
	const [redDot, setRedDot] = useState(true);
	const bell = () => {
		displayNotification();
		setNotifications((notifications) => !notifications);
		setDrop(false);
		setRedDot(false);
	};
	return (
		<>
			<NavContainer>
				<LogoNameContainer>
					<Link to='/'>
						<NavBarIcon />
					</Link>
					<Toggle>
						<DarkMoodToggle isDarkMode={dark} setIsDarkMode={setdark} />
					</Toggle>
				</LogoNameContainer>
				{Auth && (
					<IconsGroup>
						{notification && notification.length > 0  && redDot && <RedDot size={55} />}
						<Bell size={25} onClick={bell} />
						<Setting
							size={23}
							onClick={() => {
								setDrop((drop) => !drop);
								setNotifications(false);
							}}
						/>
					</IconsGroup>
				)}
				{Auth && drop && <DropDown state={[drop, setDrop]} />}
				{Auth && notifications && <NotificationsDrop Data={notification} />}
			</NavContainer>
		</>
	);
};

export default Header;
const NavContainer = styled.div`
	width: 100%;
	height: 50px;
	background-color: #008fc4;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	position: sticky;
	top: 0;
	left: 0;
	z-index: 99;
`;
const LogoNameContainer = styled.div`
	width: fit-content;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 100%;
`;
const IconsGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 90px;
	padding-right: 20px;
`;
const Setting = styled(MdSettings)`
	color: #f6f6f6;
	transition-duration: 0.5s;
	cursor: pointer;
	&:hover {
		transform: rotate(55deg);
	}
`;
const Bell = styled(MdNotificationsNone)`
	color: #f6f6f6;
	transition-duration: 0.5s;
	&:hover {
		transform: rotate(15deg);
	}
`;
const Toggle = styled.div`
	padding: 0 10px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const RedDot = styled(BsDot)`
	color: #ff5042;
	position: absolute;
	pointer-events: none;
	top: 0;
	right: 55px;
	
`;
