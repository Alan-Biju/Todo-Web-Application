import React from 'react'
import DarkModeToggle from 'react-dark-mode-toggle';
import styled from 'styled-components'
const DarkMoodToggle = ({ setIsDarkMode, isDarkMode }) => {
	return (
		<>
			<Dark onChange={ setIsDarkMode} checked={ isDarkMode } size={ 45 } speed={ 1.6}/>
		</>
	);
};

export default DarkMoodToggle
const Dark = styled(DarkModeToggle)`
`;