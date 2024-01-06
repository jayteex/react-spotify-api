import React from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist.js';

function Playlist(props) {
	const handleNameChange = (event) => {
			props.onNameChange(event.target.value);
		};


	return (
		<div className='playlist-container'>
			<input onChange={handleNameChange} defaultValue={"New Playlist"} />
			<Tracklist
				tracks={props.playlistTracksProp}
				showRemoveButton={true}
				onRemove={props.onRemove}
			/>
			<button className="Playlist-button" onClick={props.onSave}>
				Save to Spotify
			</button>

		</div>
	);
}

export default Playlist;