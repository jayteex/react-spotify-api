import React, { useState } from 'react';
import './App.css';
import Search from '../Search/Search.js';
import Results from '../Results/Results.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from "../SpotifyAPI/Spotify.js";
import { useCallback } from 'react';


function App() {

	const [searchResults, setSearchResults] = useState([]);
	const [playlistName, setPlaylistName] = useState('New Playlist');
	const [playlistTracks, setPlaylistTracks] = useState([]);

	const searchy = (searchyTerm) => {
		Spotify.search(searchyTerm).then(setSearchResults);
	};

	const addTrack = (track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
        return;
			}

      setPlaylistTracks((prev) => [...prev, track]);
    };


  const removeTrack = (track) => {
    setPlaylistTracks((prevStateOfPlaylist) =>
      prevStateOfPlaylist.filter((currentTrack) => currentTrack.id !== track.id)
    );
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    const trackUris = playlistTracks.map((track) => track.uri);

    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);

    });
  };


	return (

		<div>
			<h1>Jamming</h1>

			<div className='app-outer-container'>
				<Search onSearch={searchy}  />
			</div>

			<div className='app-outer-container'>
				<div className='app-inner-container-left'>
					<Results searchResultsFromAPI={searchResults} onAdd={addTrack}/>
				</div>
				<div className='app-inner-container-right'>
					<Playlist 
            playlistTracksProp={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist}
					/>
				</div>
			</div>

		</div>

	);
}

export default App;
