import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
const Loading = () => {
	return (
		<>
			<ImageBox>
				<ReactLoading
					type={'bars'}
					color={'#008FC4'}
					height={30}
					width={80}
				/>
			</ImageBox>
		</>
	);
};

export default Loading;
const ImageBox = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
