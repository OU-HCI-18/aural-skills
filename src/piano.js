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
    <WhiteNote name={'C4'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'C#4'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'D4'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'Eb4'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'E4'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'F4'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'F#4'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'G4'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'Ab4'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'A4'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'Bb4'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'B4'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'C5'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'C#5'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'D5'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'Eb5'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'E5'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'F5'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'F#5'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'G5'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'Ab5'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'A5'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'Bb5'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'B5'} onNoteClick={props.onNoteClick} />
  </div>
  );
}

function PianoPhone(props) {
  return (
  <div className="piano phone">
    <WhiteNote name={'C4'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'C#4'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'D4'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'Eb4'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'E4'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'F4'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'F#4'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'G4'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'Ab4'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'A4'} onNoteClick={props.onNoteClick} />
      <BlackNote name={'Bb4'} onNoteClick={props.onNoteClick} />
    <WhiteNote name={'B4'} onNoteClick={props.onNoteClick} />
  </div>
  );
}


export {Piano, PianoPhone};
export default Piano;