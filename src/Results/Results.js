import React from 'react';
import './Results.css';
import Tracklist from '../Tracklist/Tracklist.js';

function Results(props) {
  return (
    <div className='results-container'>
      <h2>Search Results</h2>
      <Tracklist tracks={props.searchResults} onAdd={props.onAdd}/>
    </div>
  );
};

export default Results;