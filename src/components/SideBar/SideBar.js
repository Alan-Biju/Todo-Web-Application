import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import {
	MdToday,
	MdKeyboardArrowDown,
	MdKeyboardArrowUp,
	MdAdd,
	MdLibraryBooks,
	MdDoneAll,
} from 'react-icons/md';
import {
	RiErrorWarningLine,
	RiArrowRightSLine,
	RiArrowLeftSLine,
	RiDeleteBinLine,
} from 'react-icons/ri';
import { BsDot } from 'react-icons/bs';
import { useTodo } from '../../Context/TodoProvider';
const SideBar = () => {
	const [drop, setDrop] = useState(false); ////------category drop------
	const [Inputdrop, setInputDrop] = useState(false); //-------------navbar moving----------------
	const [sidebar, setSidebar] = useState(true);
	const {
		category,
		setCategoryItem,
		categoryDisplay,
		categoryDelete,
		setSwitchTodo,
		today,
	} = useTodo();
	const Input = useRef();
	const Color = useRef();

	const categoryHandler = async (data) => {
		setSidebar(true);
		setSwitchTodo('catogery');

		await categoryDisplay(data);
	};
	const setCategory = async () => {
		setInputDrop(false);
		await setCategoryItem(Input.current.value, Color.current.value);
	};
	return (
		<>
			<SideBarContainer Show={sidebar}>
				<MobileMenuIcon
					style={{ color: '#f6f6f6' }}
					onClick={() => setSidebar(!sidebar)}>
					{sidebar ? <RiArrowRightSLine /> : <RiArrowLeftSLine />}
				</MobileMenuIcon>

				<DataContainer>
					<Item
						onClick={() => {
							setSidebar(true);
							setSwitchTodo('Home');
						}}>
						<li>
							<MdLibraryBooks />
						</li>
						<li>All</li>
					</Item>
					<Item
						onClick={() => {
							setSidebar(true);
							today();
							setSwitchTodo('Today');
						}}>
						<li>
							<MdToday />
						</li>
						<li>Today</li>
					</Item>
					<Item
						onClick={() => {
							setSidebar(true);
							categoryHandler('Important');
							setSwitchTodo('catogery');
						}}>
						<li>
							<RiErrorWarningLine />
						</li>
						<li>Important</li>
					</Item>

					<br />
				</DataContainer>
				<Category>
					<MainHead
						onClick={() =>
							setDrop((drop) => {
								setDrop(!drop);
								setInputDrop(false);
							})
						}>
						<li>{drop ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}</li>
						<p>Category</p>
					</MainHead>
					{drop && (
						<CatgoryDrop>
							{category &&
								category.map((item, idx) => {
									return (
										<DropDown key={idx}>
											<div onClick={() => categoryHandler(item.id)}>
												<BsDot size={35} style={{ color: `${item.color}` }} />
												<li>{item.id}</li>
											</div>

											<RiDeleteBinLine
												onClick={() => categoryDelete(item.id)}
												size={13}
												style={{ color: '#a19c9c', cursor: 'pointer' }}
											/>
										</DropDown>
									);
								})}
							<Add onClick={() => setInputDrop(!Inputdrop)}>
								<li>
									<MdAdd />
								</li>
								<li>Add catgory</li>
							</Add>
							{Inputdrop && (
								<InputBox>
									<input type='color' ref={Color} />
									<input
										type='text'
										placeholder='add your catgory'
										ref={Input}
										required
									/>

									<button onClick={setCategory}>
										<MdDoneAll size={17} style={{ color: 'white' }} />
									</button>
								</InputBox>
							)}
						</CatgoryDrop>
					)}
				</Category>
			</SideBarContainer>
		</>
	);
};

export default SideBar;
const MobileMenuIcon = styled.div`
	font-size: 1.5rem;
	position: absolute;
	top: 3px;
	right: -25px;
	width: 25px;
	height: 25px;
	background-color: #008fc4;
	border-radius: 0 35px 35px 0;
	display: grid;
	place-items: center;
	display: none;
	@media (max-width: 650px) {
		display: block;
	}
`;

const SideBarContainer = styled.div`
	width: 100%;
	max-width: 280px;
	min-width: calc(240px - 25px);
	height: calc(100vh - 50px);
	transition: background-color 0.8s ease;
	background-color: ${(prop) => prop.theme.secondaryBackground};
	padding: 10px;
	position: sticky;
	top: 50px;
	left: 0;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
	z-index: 1;
	@media (max-width: 650px) {
		transition: all 0.7s ease;
		transform: ${({ Show }) => (Show ? 'translatex(-100%)' : 'translatex(0%)')};
		position: fixed;
	}
`;
const DataContainer = styled.div`
	background: transparent;
`;
const Item = styled.ul`
	width: 90%;
	margin: 0 auto;
	font-family: 'Raleway', sans-serif;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	height: 40px;
	padding: 0 20px;
	transition: background-color 0.8s ease;
	background-color: ${(prop) => prop.theme.sideBarBackground};
	border-radius: 5px;
	margin-bottom: 2px;
	cursor: pointer;
	&:hover {
		background-color: ${(prop) => prop.theme.HoverSideBar};
	}

	li {
		font-size: 0.98rem;
		display: flex;
		align-items: center;
		justify-content: center;
		list-style: none;
		margin-right: 10px;
		font-weight: 600;
		transition: color 0.9s ease;
		color: ${(prop) => prop.theme.secondaryFontColor};
	}
`;
const Category = styled(DataContainer)``;
const MainHead = styled(Item)`
	p {
		display: flex;
		align-items: center;
		justify-content: center;
		list-style: none;
		margin-right: 10px;
		font-weight: 600;
		color: #615e5e;
	}
`;
const Drop = keyframes`
from{
    opacity:0;
    transform: scale(0.98);
}
to{
    opacity:1;
    transform: scale(1);

}
`;
const CatgoryDrop = styled.div`
	animation: 0.5s ${Drop} ease;
`;
const DropDown = styled(Item)`
	justify-content: space-between;
	padding-left: 40px;
	cursor: auto;
	div {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	li {
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 1px;
		text-transform: capitalize;
	}
`;
const Add = styled(Item)`
	padding-left: 50px;

	li {
		font-size: 0.8rem;
		color: #a5a5a5;
		white-space: nowrap;
	}
`;
const InputBox = styled(Add)`
	border: 1px solid #e2dcdc;
	width: 100%;
	justify-content: center;
	padding: 0;
	height: fit-content;
	button {
		border: 1px solid #e2dcdc;
		padding: 6px 10px;
		font-size: 17px;
		cursor: pointer;
		background: #008fc4;
		border-bottom-right-radius: 3px;
		border-top-right-radius: 3px;
		transition-duration: 0.5s;
		height: 100%;
		@media (max-width: 600px) {
			margin: 0;
		}
	}
	input {
		width: 100%;
		height: 100%;
	}
	input[type='color'] {
		border: none;
		width: 42px;
		height: 36px;
		cursor: cell;
		outline: none;
	}
	input[type='text'] {
		padding: 8px;
		font-size: 17px;
		border: none;
		outline: none;
		height: 100%;

		font-family: 'Raleway', sans-serif;
		text-transform: capitalize;
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
