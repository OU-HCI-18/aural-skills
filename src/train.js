import React from 'react';
import './App.css';

class TrainingData {
  note_stack = [];
  guess_stack = [];
  result_stack = [];
  
  guessed = false;
  start = false;

  constructor() {
    this.isCorrect = this.isCorrect.bind(this);
    this.addResult = this.addResult.bind(this);
    this.addGuess  = this.addGuess.bind(this);
    this.addNote   = this.addNote.bind(this);
    this.calcScore = this.calcScore.bind(this);
  }

  isCorrect() {
    if (this.guessed) 
      return false;
    this.guessed = true;
    
    return (this.note_stack[0] === this.guess_stack[0]) ;
  }
  addResult() {
    this.result_stack.unshift(this.isCorrect());
  }
  addGuess(note) {
    if (!this.guessed)
      this.guess_stack.unshift(note);
    // else
    //   this.guess_stack[0] = note;
    this.addResult();
  }
  addNote(note) {
    if (!this.guessed && this.start) {
      this.guess_stack.unshift('-');
      this.result_stack.unshift(false);
    }
    this.start = true;
    this.guessed = false;
    this.note_stack.unshift(note);
  }
  calcScore() {
    var score = 0;
    for (let i=0; i < this.note_stack.length; ++i) {
      if (i < this.guess_stack.length)
        if (this.note_stack[i] === this.guess_stack[i])
          ++score;
    }
    if (score === 0)
      return [0,0];
    return [score, Math.round(100 * (score / this.note_stack.length))];
  }
}

class TrainingSession extends React.Component{
  note_stack = [];
  guess_stack = [];
  result_stack = [];

  guessed = false;
  start = false;
  
  constructor(props) {
    super(props);
    this.state = {
      note: '',
      guess: '',
      result: ''
    }
    this.train_data = new TrainingData();

    if (props.train_data != null) 
      this.train_data = props.train_data;
    
    this.onNoteChange   = this.onNoteChange.bind(this);
    this.onGuessChange  = this.onGuessChange.bind(this);
    this.onPlay         = this.onPlay.bind(this);
    this.onStart        = this.onStart.bind(this);
    this.onContinue     = this.onContinue.bind(this);
    this.onResults      = this.onResults.bind(this);
  }
  onNoteChange(value) {
    this.train_data.addNote(value);
    this.setState({note: value});
  }
  onGuessChange(value) {
    if (this.train_data.guessed)
      return;
    this.train_data.addGuess(value);
    this.setState({guess: value});
    if (this.props.mode === 'guess') {
      var res = this.train_data.result_stack[0] ? ' : Correct' : ' : Incorrect';
      this.setState({result: res});
    }
  }
  onPlay() {
    this.train_data = new TrainingData();
    this.setState({
      note: '',
      guess: '',
      result: ''
    });
    this.props.setMode('play');
  }
  onStart() {
    this.train_data = new TrainingData();
    this.setState({
      note: '',
      guess: '',
      result: ''
    });
    this.props.setMode('guess');
  }
  onContinue() {
    this.props.setMode('guess');
  }
  onResults() {
    this.props.setMode('results');
  }
  render() {
    if (this.props.mode === 'play') {
      return(
      // <header className="App-header">
      //   <h1>Aural Training</h1> 
      //   <p>
      //     <Link to='/train'>
      //       <button className="App-button colorGreen" onClick={this.onStart}>
      //       Start
      //       </button>
      //     </Link>
      //     <Link to='/settings'>
      //       <button className="App-button colorCoral">Settings</button>
      //     </Link>
      //   </p>
      //   <p>Play a note!</p>
        <this.props.ui 
          onResults = {this.onResults}
          onNoteChange = {this.onNoteChange}
          onGuessChange = {this.onGuessChange}
          note = {this.state.note}
          guess = {this.state.guess}
          result = {this.state.result}
          mode = {this.props.mode}
        />
      // </header>
      );
    }
    else if (this.props.mode === 'guess') {
      return(
      // <header className="App-header">
      //   <h1>Aural Training</h1> 
      //   <p>
      //     <Link to='/'>
      //       <button className="App-button colorGreen" onClick={this.onPlay}>Stop</button>
      //     </Link>
      //     <Link to='/settings'>
      //       <button className="App-button colorCoral">Settings</button>
      //     </Link>
      //     <Link to='/results'>
      //       <button className="App-button colorYellow" onClick={this.onResults}>
      //         Results
      //       </button>
      //     </Link>
      //   </p>
      //   <p>What Note Just Played?</p>
        <this.props.ui 
          onResults = {this.onResults}
          onNoteChange = {this.onNoteChange}
          onGuessChange = {this.onGuessChange}
          note = {this.state.note}
          guess = {this.state.guess}
          result = {this.state.result}
          mode = {this.props.mode}
        />
      // </header>
      );
    }
    return (<p>Error displaying user interface!</p>);
  }
}

export default TrainingSession;
export {TrainingData, TrainingSession};