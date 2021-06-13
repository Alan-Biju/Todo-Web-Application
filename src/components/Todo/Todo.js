import React from 'react';
import styled from 'styled-components';
import { useTodo } from '../../Context/TodoProvider';
import TodoList from './TodoList';
import TodoAdd from './TodoAdd';
const Todo = () => {
	const { todoData, switchTodo, categorytodoData, titleCategory, todayItem } =
		useTodo();
	const TodoListSwitch = () => {
		switch (switchTodo) {
			case 'Home':
				return <TodoList data={todoData} title='All' />;
			case 'catogery':
				return <TodoList data={categorytodoData} title={titleCategory} />;
			case 'Today':
				return <TodoList data={todayItem} title='Today' />;
			default:
				return <TodoList data={todoData} title='All' />;
		}
	};
	return (
		<>
			<TodoContainer>
				{TodoListSwitch()}
				<TodoAdd />
			</TodoContainer>
		</>
	);
};

export default Todo;
const TodoContainer = styled.div`
	width: 100%;
	padding: 20px 30px;
`;
