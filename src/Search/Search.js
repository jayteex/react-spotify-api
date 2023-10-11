import React, { useState} from 'react';
import './Search.css';

function Search(props) {
	const [term, setTerm] = useState("");

	const handleChange = (event) => {
		setTerm(event.target.value)
	};

	const searchFunction = () => {
		props.onSearch(term);
	};

	return (
		<div className='search-container'>
			<label>Search for your favorite music</label>
			<input type='text' id='search' name='search' placeholder='Enter here' onChange={handleChange} />
			<button onClick={searchFunction}>Submit</button>
		</div>
	);
};

export default Search;