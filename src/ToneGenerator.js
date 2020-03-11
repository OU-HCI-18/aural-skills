import React from 'react';
import { Synth } from 'tone';

var synth = new Synth().toMaster();
var note_arr = ['A','B','C','D','E','F','G'];

function NoteButton(props) {
  return (
    <button className="Note-button" onClick={(e) => props.handleClick(props.name)}>{props.name}</button>
  );
}
function NoteButtons(props) {
  return(
  <div className="Note-header">
    <NoteButton name={'C'} handleClick={props.handleClick} />
    <NoteButton name={'D'} handleClick={props.handleClick} />
    <NoteButton name={'E'} handleClick={props.handleClick} />
    <NoteButton name={'F'} handleClick={props.handleClick} />
    <NoteButton name={'G'} handleClick={props.handleClick} />
    <NoteButton name={'A'} handleClick={props.handleClick} />
    <NoteButton name={'B'} handleClick={props.handleClick} />
  </div>
  );
}

class ToneGen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: props.mode, 
      message: 'You Played: '
    };

    this.handleClick = this.handleClick.bind(this);
    this.random_note = this.random_note.bind(this);
    this.play_note = this.play_note.bind(this);
    this.play_note_button = this.play_note_button.bind(this);
    this.play_rand_note = this.play_rand_note.bind(this);
    this.guess_note_button = this.guess_note_button.bind(this);
    // this.last_guess = this.last_guess.bind(this);
    // this.guess_output = this.guess_output.bind(this);
  }

  componentDidMount() {
    if (this.state.mode === 'guess') {
      this.setState({
        message: 'You Guessed: '
      })
    }
  }

  handleClick(name) {
    if (this.state.mode === 'play') {
      this.play_note_button(name);
    }
    else if (this.state.mode === 'guess') {
      this.guess_note_button(name);
    }
  }
  
  random_note() {
    // 4 = octave
    // TODO: refactor into a property
    // TODO: make this configurable from settings
    return note_arr[Math.floor(Math.random() * note_arr.length)] + '4';
  }

  play_note(note) {
    console.log(note);
    //play the note for the duration of an quarter note
    synth.triggerAttackRelease(note, '4n');
  }

  play_note_button(note) {
    this.play_note(note+'4')
    if (this.state.mode === 'play') {
      this.props.onGuessChange(note)
    }
    else {
      this.props.onNoteChange(note)
    }
  }

  play_rand_note() {
    var note = this.random_note();
    if (this.state.mode === 'play') {
      this.props.onGuessChange(note)
    }
    else {
      this.props.onNoteChange(note)
    }
    this.play_note(note);
  }

  guess_note_button(note) {
    note = note + '4';
    this.props.onGuessChange(note);
  }

  render() {
    return(
    <div>
      <NoteButtons handleClick={this.handleClick}/>
      <button className="App-button colorYellow" onClick={this.play_rand_note}>
        {this.props.b_name}
      </button>
      <p>{this.state.message}</p>
    </div>);
  }
}

export default ToneGen;