import React from 'react';
import styled, { keyframes } from 'styled-components';
import { AiOutlineCloseSquare } from 'react-icons/ai';

function ErrorMessage({ state }) {
	const [message, setMessage] = state;

	return (
		<>
			<ErrorContainer onClick={() => setMessage()}>
				<p>{message} 😔</p>
				<Close size={24} style={{ color: '#ffffff' }} />
			</ErrorContainer>
		</>
	);
}

export default ErrorMessage;
const MoveIn = keyframes`
from{
    transform:translateX(100%);

}to{
    transform:translateX(0%);
}
`;
const ErrorContainer = styled.div`
	width: 235px;
    min-width: 235px;
	max-width: 380px;
	height: 70px;
	background-color: #ff5042;
	display: flex;
	align-items: center;
	justify-content:space-around;
	border-radius: 5px;
	position: fixed;
	top: calc(5% + 30px);
	right: 0%;
    padding:5px;
    cursor: pointer;
	animation: 0.8s ${MoveIn} cubic-bezier(0.51, 0.92, 0.24, 1.15);
    
	p {
		color: #ffffff;
		letter-spacing: 1px;
		font-size: 0.6rem;
		font-family: 'Raleway', sans-serif;
		font-weight: bold;
        width:290px;
        margin-left: 5px;
        
	}
`;
const Close = styled(AiOutlineCloseSquare)``;
