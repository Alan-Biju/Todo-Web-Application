import React from 'react';
import styled from 'styled-components';

const Input = ({ type, label, state }) => {
	const [value, setValue] = state;
	return (
		<>
			<InputContainer>
				<InputBox
					type={type}
					name={type}
					value={value}
					autoComplete='false'
					onChange={(e) => setValue(e.target.value)}
					required
				/>
				<Lable>
					<Span>{label}</Span>
				</Lable>
			</InputContainer>
		</>
	);
};

export default Input;
const InputContainer = styled.div`
	width: 100%;
	position: relative;
	height: 40px;
	margin: 5px 0;
	background-color: transparent;
	
`;
const InputBox = styled.input`
	width: 100%;
	transition: color 0.9s ease;
	color: ${(prop) => prop.theme.MainFontColor};
	font-size: 1rem;
	height: 100%;
	padding-top: 20px;
	border: none;
	border-bottom: 1px solid #8f8b8b;
	outline: none;
	background-color: inherit;
	&:focus,
	&:valid,
	&:active {
		border-bottom: 2px solid #008fc4;
	}
	&:focus + label span,
	&:valid + label span {
		transform: translateY(-150%);
		font-size: 0.7rem;
		color: #008fc4;
		@media (max-width: 350px) {
			font-size: 0.6rem;
		}
	}
`;
const Lable = styled.label`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	background-color: inherit;
	&:focus,
	&:valid,
	&:active {
		border: none;
	}
	&::after {
		content: '';
		left: 0;
		bottom: -1;
		position: absolute;
		width: 100%;
		height: 100%;
	}
`;
const Span = styled.span`
	font-size: 0.7rem;
	color: #746d6d;
	position: absolute;
	bottom: 5px;
	left: 0;
	transition: all 0.3s ease;
	font-family: 'Raleway', sans-serif;
	letter-spacing: 1px;
	background-color: inherit;

	@media (max-width: 360px) {
		font-size: 0.6rem;
	}
`;
