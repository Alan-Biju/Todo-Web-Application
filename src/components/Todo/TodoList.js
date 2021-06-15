import React from 'react';
import styled from 'styled-components';
import { MdDelete, MdRadioButtonChecked,MdRadioButtonUnchecked } from 'react-icons/md';
import { BiTask } from 'react-icons/bi';
import { useTodo } from '../../Context/TodoProvider';
const TodoList = ({ data, title }) => {
	const { deleteTodo, isDone } = useTodo();
	return (
		<>
			<TodoListContainer>
				<TodoListTitle>
					<p>{title}</p>
				</TodoListTitle>
				<TodoListBox>
					{data && data.length > 0 ? (
						data.map((data, idx) => {
							return (
								<TodoListItems key={idx} state={data.isDone}>
									<TodoItem state={data.isDone} color={data.color}>
										{data.isDone ? (
											<MdRadioButtonChecked
												size={25}
												style={{ margin: '0 10px', color: `${data.color}` }}
											/>
										) : (
											<MdRadioButtonUnchecked
												size={25}
												style={{ margin: '0 10px', color: `${data.color}` }}
											/>
										)}
										<p>{data.message}</p>
									</TodoItem>
									<TodoIcons>
										<BiTask
											style={{ cursor: 'pointer' }}
											onClick={() =>
												isDone(data.category, data.id, data.isDone)
											}
										/>
										<MdDelete
											style={{ cursor: 'pointer' }}
											onClick={() => deleteTodo(data.category, data.id)}
										/>
									</TodoIcons>
								</TodoListItems>
							);
						})
					) : (
						<TodoListItems>
							<TodoItem>
								<div></div>
								<p>No Todo's</p>
							</TodoItem>
							<TodoIcons></TodoIcons>
						</TodoListItems>
					)}
				</TodoListBox>
			</TodoListContainer>
		</>
	);
};

export default TodoList;
const TodoListContainer = styled.div`
	width: 90%;
	margin: 0 auto;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
	transition: background-color 0.8s ease;
	background-color: ${(prop) => prop.theme.secondaryBackground};
	border-radius: 5px;
	padding: 10px;
	margin-bottom: 10px;
	transition: all 0.3s ease;
	@media (max-width: 400px) {
		padding: 5px;
		width: 100%;
	}
`;
const TodoListTitle = styled.div`
	width: 100%;
	height: 30px;
	margin-bottom: 10px;
	transition: color 0.9s ease;
	color: ${(prop) => prop.theme.MainFontColor};
	p {
		font-family: 'Raleway', sans-serif;
		font-size: 1.1rem;
		letter-spacing: 1px;
		font-weight: 600;
		text-transform: capitalize;
	}
`;
const TodoListBox = styled.div``;
const TodoListItems = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 50px;
	margin-bottom: 15px;
	transition: color 0.9s ease, border 0.8s ease;
	background: ${(prop) => prop.theme.TodoListItem};
	border-radius: 5px;
	border: 1px solid ${(prop) => prop.theme.TodiListItemHover};
`;
const TodoItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	P {
		font-family: 'Roboto', sans-serif;
		font-size: 0.9rem;
		transition: color 0.9s ease;
		color: ${(prop) => (prop.state ? '#6d6c6cce' : prop.theme.MainFontColor)};
		text-decoration: ${(prop) => (prop.state ? 'line-through' : 'none')};
	}
`;
const TodoIcons = styled.div`
	width: 50px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 1.2rem;
	transition: color 0.9s ease;
	color: ${(prop) => prop.theme.secondaryFontColor};
`;
