import React, { useState } from 'react';
import './App.css';
import Search from '../Search/Search.js';
import Track from '../Track/Track.js';
import Tracklist from '../Tracklist/Tracklist.js'
import Results from '../Results/Results.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from "../SpotifyAPI/Spotify.js";


function App() {

	const [searchResults, setSearchResults] = useState([]);
	const [playlistName, setPlaylistName] = useState('New Playlist');
	const [playlistTracks, setPlaylistTracks] = useState([]);

	const search = (term) => {
		Spotify.search(term).then(setSearchResults);
	};


	return (

		<div>
			<h1>Jamming</h1>

			<div className='outer-container'>
				<Search onSearch={search} />
			</div>

			<div className='outer-container'>

				<div className='inner-container-left'>
					<Results searchResults={searchResults} />
				</div>

				<div className='inner-container-right'>
					<Playlist />
				</div>

			</div>

		</div>

	);
}

export default App;
