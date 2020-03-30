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
    <button className="Note-button Blank-note" ></button>
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


// class Piano extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       mode: props.mode,
//       note: '',
//       guess: ''
//     };
//     this.handleGuess = this.handleGuess.bind(this);
//     this.handlePlay = this.handlePlay.bind(this);
//     this.handleNext = this.handleNext.bind(this);
//     this.handleRnd = this.handleRnd.bind(this);

//     this.toneGen = new ToneGen();
//   }

//   handleGuess(note) {
//     this.props.onGuessChange(note+'4');
//   }

//   handlePlay(note) {
//     this.toneGen.play_note_button(note);
//     this.props.onNoteChange(note+'4');
//   }

//   handleNext() {
//     this.props.onNoteChange(this.toneGen.play_rand_note());
//   }

//   handleRnd() {
//     this.props.onNoteChange(this.toneGen.play_rand_note());
//   }

//   render() {
//     var button_click;
//     var message;
//     var next;
//     var next_message;
//     var note;
//     if (this.props.mode === 'guess') {
//       button_click = this.handleGuess;
//       message = "You Guessed: ";
//       next = this.handleNext;
//       next_message = "Play Next";
//       note = this.props.guess;
//     }
//     else {
//       button_click = this.handlePlay;
//       message = "Note Played:";
//       next = this.handleRnd;
//       next_message = "Random Note";
//       note = this.props.note;
//     }
//     return (
//       <div>
//         <NoteButtons handleClick={button_click} />
//         <button className='App-button colorYellow' onClick={next}>
//           {next_message}
//         </button>
//         <p>{message}</p>
//         <p>{note}{this.props.result}</p>
//       </div>
//     );  
//   }
// }

export default Piano;
