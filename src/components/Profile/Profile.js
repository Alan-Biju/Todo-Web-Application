import React, { useEffect } from 'react';
import Profilecard from '../ReUseable/Profilecard';
import styled from 'styled-components';
import { useTodo } from '../../Context/TodoProvider';

const Profile = () => {
	const { todoData, todayItem, categorytodoData, categoryDisplay } = useTodo();
	const Complete = todoData.filter((item) => item.isDone === true);

	useEffect(() => {
		categoryDisplay('Important');
		return () => categoryDisplay('Important');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<Profilecard />
			<ProfieContainer>
				<Title>activity</Title>
				<ActivityContainer>
					<ActivityBox>
						<h2>Total Todo's</h2>
						<p>{todoData.length}</p>
					</ActivityBox>
					<ActivityBox>
						<h2>Completed task's</h2>
						<p>{Complete.length}</p>
					</ActivityBox>
					<ActivityBox>
						<h2>Today's task's</h2>
						<p>{todayItem.length}</p>
					</ActivityBox>
					<ActivityBox>
						<h2>Important's task's</h2>
						<p>{categorytodoData.length}</p>
					</ActivityBox>
				</ActivityContainer>
			</ProfieContainer>
		</>
	);
};

export default Profile;
const ProfieContainer = styled.div`
	width: 100%;
	margin-top: 2%;
`;
const ActivityContainer = styled.div`
	width: fit-content;
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	grid-column-gap: 15px;
	grid-row-gap: 15px;
	@media (max-width: 900px) {
		grid-template-columns: repeat(1, 1fr);
	}
`;
const Title = styled.h1`
	width: 50%;
	margin: 20px auto;
	font-size: 1rem;
	transition: color 0.9s ease;
	color: ${(prop) => prop.theme.secondaryFontColor};
	font-family: 'Raleway', sans-serif;
	letter-spacing: 1px;
	text-transform: capitalize;
`;
const ActivityBox = styled.div`
	box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
	margin: 0 auto;
	width: 100%;
	min-width: 230px;
	max-width: 300px;
	height: 180px;
	transition: background-color 0.8s ease;
	background-color: ${(prop) => prop.theme.secondaryBackground};
	border-radius: 10px;
	font-family: 'Raleway', sans-serif;
	letter-spacing: 1px;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-around;
	transition: color 0.9s ease;
	h2 {
		font-size: 1rem;
		color: ${(prop) => prop.theme.secondaryFontColor};
	}
	p {
		font-size: 2rem;
		color: ${(prop) => prop.theme.MainFontColor};
		font-weight: bold;
	}
`;
