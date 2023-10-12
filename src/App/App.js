import React, { useState } from 'react';
import './App.css';
import Search from '../Search/Search.js';
import Results from '../Results/Results.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from "../SpotifyAPI/Spotify.js";


function App() {

	const [searchResults, setSearchResults] = useState([]);

	// The playlist was not implemented yet
	const [playlistName, setPlaylistName] = useState('New Playlist');
	const [playlistTracks, setPlaylistTracks] = useState([]);

	const searchy = (searchyTerm) => {
		Spotify.search(searchyTerm).then(setSearchResults);
	};


	return (

		<div>
			<h1>Jamming</h1>

			<div className='app-outer-container'>
				<Search onSearch={searchy} />
			</div>

			<div className='app-outer-container'>

				<div className='app-inner-container-left'>
					<Results searchResults={searchResults} />
				</div>
				<div className='app-inner-container-right'>
					<Playlist />
				</div>

			</div>

		</div>

	);
}

export default App;
