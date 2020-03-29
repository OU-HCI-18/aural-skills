import React from 'react';
// import { Link } from 'react-router-dom';
import './App.css';

import ToneGen from './ToneGenerator.js';
// import TrainingSession from './train.js';

function NoteButton(props) {
  if (props.color === 'white') {
    return (
      <button className="Note-button Note-white" onClick={(e) => props.handleClick(props.name)}>{props.name}</button>
    );
  }
  else if (props.color=== 'black') {
    return (
      <button className="Note-button Note-black" onClick={(e) => props.handleClick(props.name)}>{props.name}</button>
    );    
  }
  else {
    return (
      <button className="Note-button Blank-note" ></button>
    ); 
  }
}

function NoteButtons(props) {
  return(
  <div className="Note-header">
    <div>
      <NoteButton color='black' name={'C#'} handleClick={props.handleClick} />
      <NoteButton color='black' name={'Eb'} handleClick={props.handleClick} />
      <NoteButton color='blank' />  
      <NoteButton color='black' name={'F#'} handleClick={props.handleClick} />
      <NoteButton color='black' name={'Ab'} handleClick={props.handleClick} />
      <NoteButton color='black' name={'Bb'} handleClick={props.handleClick} />
    </div>
    <div>
      <NoteButton color='white' name={'C'} handleClick={props.handleClick} />
      
      <NoteButton color='white' name={'D'} handleClick={props.handleClick} />
      
      <NoteButton color='white' name={'E'} handleClick={props.handleClick} />
      <NoteButton color='white' name={'F'} handleClick={props.handleClick} />
      
      <NoteButton color='white' name={'G'} handleClick={props.handleClick} />
      
      <NoteButton color='white' name={'A'} handleClick={props.handleClick} />
      
      <NoteButton color='white' name={'B'} handleClick={props.handleClick} />
   </div>
  </div>
  );
}


class Piano extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: props.mode,
      note: '',
      guess: ''
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleRnd = this.handleRnd.bind(this);

    this.toneGen = new ToneGen();
  }

  handleGuess(note) {
    this.props.onGuessChange(note+'4');
  }

  handlePlay(note) {
    this.toneGen.play_note_button(note);
    this.props.onNoteChange(note+'4');
  }

  handleNext() {
    this.props.onNoteChange(this.toneGen.play_rand_note());
  }

  handleRnd() {
    this.props.onNoteChange(this.toneGen.play_rand_note());
  }

  render() {
    var button_click;
    var message;
    var next;
    var next_message;
    var note;
    if (this.props.mode === 'guess') {
      button_click = this.handleGuess;
      message = "You Guessed: ";
      next = this.handleNext;
      next_message = "Play Next";
      note = this.props.guess;
    }
    else {
      button_click = this.handlePlay;
      message = "Note Played:";
      next = this.handleRnd;
      next_message = "Random Note";
      note = this.props.note;
    }
    return (
    // <div className="App">
    //   <header className="App-header">
    //     <h1>Training</h1>
        // <p>
        //   <Link to='/'>
        //     <button className="App-button colorGreen">Stop</button>
        //   </Link>
        //   <Link to='/settings'>
        //     <button className="App-button colorCoral">Settings</button>
        //   </Link>
        //   <Link to='/results'>
        //     <button className="App-button colorYellow" onClick={this.props.onResults}>
        //       Results
        //     </button>
        //   </Link>
        // </p>
    //     <p>What Note Just Played?</p>
        <div>
          <NoteButtons handleClick={button_click} />
          <button className='App-button colorYellow' onClick={next}>
            {next_message}
          </button>
          <p>{message}</p>
          <p>{note}{this.props.result}</p>
        </div>
  //     </header>
  //   </div>
  );  
  }
}

export default Piano;
