import React from 'react';
import './Track.css';

function Track(props) {

  const addTrack = (event) => {
    props.onAdd(props.track);
  };

  const removeTrack = (event) => {
    props.onRemove(props.track);
  };

  
  const renderAction = () => {
    if (props.showRemoveButton) {
      return (
        <button className="Track-action" onClick={removeTrack}>
          -
        </button>
      );
    }
    return (
      <button className="Track-action" onClick={addTrack}>
        +
      </button>
    );
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist} | {props.track.album}
        </p>
      </div>
      <div>
        <img className="Track-img" src={props.track.src} alt={`Album cover of ${props.track.album}`} />
      </div>
      {renderAction()}
    </div>
  );


};

export default Track;