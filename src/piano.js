import React from 'react';
import './App.css';

function WhiteNote(props) {
  return (
    <button 
        className="Note-button Note-white" 
        onClick={(e) => props.onNoteClick(props.name)}>
      {props.name}
    </button>
  );
}
function BlackNote(props) {
  return (
    <button 
        className="Note-button Note-black" 
        onClick={(e) => props.onNoteClick(props.name)}>
      {props.name}
    </button>
  );
}
function SpacerNote() {
  return (
    <button className="Blank-note" ></button>
  );
}

function Piano(props) {
  return(
  <div className="Note-header">
    {/* black notes */}
    <div>
      <BlackNote name={'C#'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'Eb'} onNoteClick={props.onNoteClick} />
      <SpacerNote />  
      <BlackNote name={'F#'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'Ab'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'Bb'} onNoteClick={props.onNoteClick} />
    </div>
    {/* white notes */}
    <div>
      <WhiteNote name={'C'} onNoteClick={props.onNoteClick} />
      
      <WhiteNote name={'D'} onNoteClick={props.onNoteClick} />
      
      <WhiteNote name={'E'} onNoteClick={props.onNoteClick} />
      <WhiteNote name={'F'} onNoteClick={props.onNoteClick} />
      
      <WhiteNote name={'G'} onNoteClick={props.onNoteClick} />
      
      <WhiteNote name={'A'} onNoteClick={props.onNoteClick} />
      
      <WhiteNote name={'B'} onNoteClick={props.onNoteClick} />
   </div>
  </div>
  );
}

export default Piano;
