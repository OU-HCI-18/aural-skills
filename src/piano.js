import React from 'react';
import './App.css';

function WhiteNote(props) {
  return (
    <div 
        className="key" 
        onClick={(e) => props.onNoteClick(props.name)}>
      {/* {props.name} */}
    </div>
  );
}
function BlackNote(props) {
  return (
    <div 
        className="key black" 
        onClick={(e) => props.onNoteClick(props.name)}>
      {/* {props.name} */}
    </div>
  );
}

function Piano(props) {
  return (
  <div className="piano">
    <WhiteNote name={'C'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'C#'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'D'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'Eb'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'E'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'F'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'F#'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'G'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'Ab'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'A'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'Bb'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'B'} onNoteClick={props.onNoteClick} />
  </div>
  );
}

export default Piano;
