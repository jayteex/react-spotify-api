import React from 'react';
import './Tracklist.css';
import Track from "../Track/Track.js";


function Tracklist(props) {
  return (
    <div className="Tracklist">
    {props.tracks.map((track) => {
      return (
        <Track
          track={track}
          key={track.id}
          onAdd={props.onAdd}
          showRemoveButton={props.showRemoveButton}
          onRemove={props.onRemove}
        />
      );
    })}
  </div> 
  );
}

export default Tracklist;