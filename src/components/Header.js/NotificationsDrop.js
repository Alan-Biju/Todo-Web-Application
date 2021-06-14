import React from 'react';
import styled, { keyframes } from 'styled-components';
import { DropDownContainer } from './DropDown';
import { MdGrain } from 'react-icons/md';
const NotificationsDrop = ({ Data }) => {
	return (
		<NotificationsContainer>
			{Data &&
				Data.map((data, idx) => {
					return (
						<MessageBox key={idx}>
							<p>
								<MdGrain /> {data.Message}
							</p>
							<span>{data.Date}</span>
						</MessageBox>
					);
				})}
		</NotificationsContainer>
	);
};

export default NotificationsDrop;
const MoveDown = keyframes`
from{
    opacity: 0;
}
to{
    opacity: 1;
   
    
}
`;
const NotificationsContainer = styled(DropDownContainer)`
	right: 52px;
	width: 240px;
	height: fit-content;
	animation: 1s ${MoveDown} cubic-bezier(0.51, 0.92, 0.24, 1.15);
	font-family: 'Raleway', sans-serif;
`;
const MessageBox = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px;
	p {
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: capitalize;
	}
	span {
		font-size: 0.6rem;
	}
`;
