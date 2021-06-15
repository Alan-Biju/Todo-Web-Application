import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { CgChevronDoubleDownR, CgChevronDoubleUpR } from 'react-icons/cg';
import { BsDot } from 'react-icons/bs';
import { RiErrorWarningLine } from 'react-icons/ri';
import { useTodo } from '../../Context/TodoProvider';
import moment from 'moment';

const TodoAdd = () => {
	const { category, AddTodo } = useTodo();
	const TodoAdd = useRef();
	const [item, setItem] = useState('');
	const [toggle, setToggle] = useState(false);
	const [drop, setDrop] = useState(false);
	const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
	const submitHandler = async () => {
		const Add = TodoAdd.current.value;
		const Imp = { id: 'Important', color: '#ff5042' };
		if (Add && (Imp || item)) {
			try {
				toggle ? await AddTodo(Imp, Add, date) : await AddTodo(item, Add, date);
				TodoAdd.current.value = '';
				setDate(moment().format('YYYY-MM-DD'));
			} catch (e) {
				console.log(e + '💋');
			}
		}
	};

	return (
		<>
			<TodoAddContanier>
				<TotoAddTitle>
					<h1>Add Todo</h1>
				</TotoAddTitle>
				<TodoAddBody>
					<TodoAddInput>
						<form>
							<input
								type='text'
								placeholder="add your Todo's"
								ref={TodoAdd}
								required
							/>
						</form>
					</TodoAddInput>
					<Date>
						<input
							type='date'
							value={date}
							onChange={(e) => setDate(e.target.value)}
							placeholder='dd-mm-yyyy'
							min={moment().format('YYYY-MM-DD')}
						/>
					</Date>
					<TodoAddButtons>
						<TodoButton>
							<ButtonAdd onClick={submitHandler}>Add Task</ButtonAdd>
							<ButtonCancel
								onClick={() => {
									TodoAdd.current.value = '';
									setToggle(false);
									setDate(moment().format('YYYY-MM-DD'));
								}}>
								cancel
							</ButtonCancel>
						</TodoButton>
						<TodoSideButtons>
							<ToggleButton>
								<p>
									<RiErrorWarningLine /> Important
								</p>
								<ToggleBtn
									onClick={() => {
										setToggle(!toggle);
										setDrop(false);
									}}
									status={toggle}></ToggleBtn>
							</ToggleButton>
							{!toggle &&
								(drop ? (
									<CgChevronDoubleDownR
										size={20}
										style={{ color: '#615e5e' }}
										onClick={() => {
											setDrop(!drop);
										}}
									/>
								) : (
									<CgChevronDoubleUpR
										size={20}
										style={{ color: '#615e5e' }}
										onClick={() => {
											setDrop(!drop);
										}}
									/>
								))}
						</TodoSideButtons>
					</TodoAddButtons>
				</TodoAddBody>
				{drop && (
					<TodoAddDropContainer>
						{category.length > 0 ? (
							category.map((item, idx) => {
								return (
									<Item
										key={idx}
										onClick={() => {
											setItem(item);
											setDrop(!drop);
										}}>
										<BsDot size={35} style={{ color: `${item.color}` }} />
										<p>{item.id}</p>
									</Item>
								);
							})
						) : (
							<Item>
								<BsDot size={35} style={{ color: `#0061A8` }} />
								<p>No data</p>
							</Item>
						)}
					</TodoAddDropContainer>
				)}
			</TodoAddContanier>
		</>
	);
};

export default TodoAdd;
const TodoAddContanier = styled.div`
	width: 90%;
	margin: 0 auto;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
	transition: background-color 0.8s ease;
	background-color: ${(prop) => prop.theme.secondaryBackground};
	border-radius: 5px;
	padding: 10px;
	height: fit-content;
	transition: all 0.3s ease;
	@media (max-width: 400px) {
		padding: 5px;
		width: 100%;
	}
`;
const TotoAddTitle = styled.div`
	width: 100%;
	background-color: #008fc4;
	height: 40px;
	display: flex;
	align-items: center;
	border-radius: 3px;
	margin-bottom: 10px;

	h1 {
		font-family: 'Raleway', sans-serif;
		font-size: 1.1rem;
		color: #fcfcfc;
		padding: 0 10px;
		letter-spacing: 1px;
		font-weight: 500;
	}
`;
const TodoAddBody = styled.div`
	width: 100%;
	height: 70%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
const TodoAddInput = styled.div`
	form {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	input {
		width: 100%;
	}
	input[type='text'] {
		padding: 8px;
		font-size: 17px;
		border: none;
		outline: none;
		font-family: 'Raleway', sans-serif;
		text-transform: capitalize;
		border: 1px solid #c7c2c2;
		border-radius: 3px;

		&::placeholder {
			font-size: 0.7rem;
			letter-spacing: 1px;
			font-family: 'Raleway', sans-serif;
			@media (max-width: 300px) {
				font-size: 0.6rem;
			}
		}
	}
`;
const Date = styled.div`
	margin: 5px 0;
	input[type='date'] {
		padding: 5px;
		font-size: 10px;
		border: 1px solid #c7c2c2;
		outline: none;
		font-family: 'Raleway', sans-serif;
		text-transform: capitalize;
		border-radius: 3px;
	}
`;
const TodoAddButtons = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media (max-width: 500px) {
		flex-direction: column;
	}
`;
const TodoButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media (max-width: 500px) {
		padding:10px 0;
		width: 100%;
	}
`;
const ButtonAdd = styled.button`
	width: 100px;
	padding: 0.7em;
	margin: 0.9em 0;
	margin-right: 10px;
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
	flex-wrap: nowrap;
	white-space: nowrap;
	&:active {
		box-shadow: inset 0 0.6em 2em -0.3em rgba(0, 0, 0, 0.15),
			inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
	}
	@media (max-width: 500px) {
		margin: 0;
		width: 80px;
		font-size: 0.7rem;
	}
`;
const ButtonCancel = styled(ButtonAdd)`
	color: #008fc4;
	background-color: transparent;
	border: 1px solid #008fc4;
`;
const TodoSideButtons = styled.div`
	display: flex;
	align-items: center;
	width: 200px;
	justify-content: space-between;
	@media (max-width: 500px) {
		width: 100%;
		margin-top: 5px;
	}
`;
const ToggleButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	p {
		font-family: 'Raleway', sans-serif;
		font-size: 0.8rem;
		padding: 0 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color 0.9s ease;
		color: ${(prop) => prop.theme.secondaryFontColor};
	}
`;
const ToggleBtn = styled.div`
	width: 40px;
	height: 18px;
	color: #7e7e7e;
	background-color: ${({ status }) => (status ? '#d1cece' : '#7e7e7e')};
	border-radius: 50px;
	position: relative;
	display: flex;
	align-items: center;
	padding: 0px 3px;
	transition: all 0.8s ease;
	z-index: 0;
	&::before {
		content: '';
		position: absolute;
		background-color: ${({ status }) => (status ? '#f54748' : '#dfdbdb')};
		width: 15px;
		height: 15px;
		border-radius: 100px;
		left: ${({ status }) => (status ? '21px' : '')};
	}
`;
const MoveDown = keyframes`
from{
    opacity: 0;

}
to{
    opacity: 1;
}
`;
const TodoAddDropContainer = styled.div`
	width: 200px;
	background: #f6f6f6;
	padding: 20px;
	margin-left: auto;
	animation: 0.8s ${MoveDown} ease;
	cursor: pointer;
	position: relative;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
	&::after {
		content: ' ';
		width: 20px;
		height: 20px;
		position: absolute;
		top: -8px;
		right: 3px;
		transform: rotate(45deg);
		background-color: inherit;
	}
`;
const Item = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	border-bottom: 1px solid #d6d2d2a0;
	p {
		font-family: 'Raleway', sans-serif;
		font-size: 0.9rem;
		text-transform: capitalize;
	}
	&:hover {
		background-color: #d6d2d2;
	}
`;
