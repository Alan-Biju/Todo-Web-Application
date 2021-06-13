import React, { useState } from 'react';
import styled from 'styled-components';
import { MdSettings, MdAdd } from 'react-icons/md';
import DropDown from './DropDown';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import NavBarIcon from '../ReUseable/NavBarIcon';
import DarkMoodToggle from '../ReUseable/DarkMoodToggle';
const Header = ({dark,setdark}) => {
	const { Auth } = useAuth();
	const [drop, setDrop] = useState(false);
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
						<Add size={25} />
						<Setting size={23} onClick={() => setDrop((drop) => !drop)} />
					</IconsGroup>
				)}
				{Auth && drop && <DropDown state={[drop, setDrop]} />}
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
const Add = styled(MdAdd)`
	color: #f6f6f6;
`;
const Toggle = styled.div`
padding: 0 10px;
	display: flex;
	align-items: center;
	justify-content: center;
`;