import React, { useState} from 'react';
import './Search.css';

function Search(props) {
	const [term, setTerm] = useState("");

	const handleChange = (e) => {
		setTerm(e.target.value)
	};

	//I changed the behavior with the onClick prop of the button. This function is not currently in use
	const searchoFunction = () => {
		props.onSearch(term);
	};

	//I added this function to hitting enter on the keyboard would also trigger the search
	const handleKeyboardEnter = (e) => {
		if (e.key === 'Enter') {
			searchoFunction(); // Trigger the search when Enter key is pressed
		}
	  }

	return (
		<div className='search-container'>
			<label>Search for your favorite songs</label>
			<input onKeyDown={handleKeyboardEnter} type='text' id='search' name='search' placeholder='Enter here' onChange={handleChange} />
			<button onClick={() => props.onSearch(term)}>Submit</button>
		</div>
	);
};

export default Search;