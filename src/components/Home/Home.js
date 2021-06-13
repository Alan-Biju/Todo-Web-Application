import React from 'react';
import SideBar from '../SideBar/SideBar';
import Todo from '../Todo/Todo';
import styled from 'styled-components';
const Home = () => {
	return (
		<>
			<HomeContainer>
				<SideBar />
				<Todo />
			</HomeContainer>
		</>
	);
};

export default Home;
export const HomeContainer = styled.div`
	display: flex;
	@media (max-width: 650px) {
		flex-direction: column;
	}
`;
