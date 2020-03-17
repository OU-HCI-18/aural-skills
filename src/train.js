import React from 'react';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom';

import Results from './results.js';

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

    this.onNoteChange = this.onNoteChange.bind(this);
    this.onGuessChange = this.onGuessChange.bind(this);
    this.isCorrect = this.isCorrect.bind(this);
    this.onContinue = this.onContinue.bind(this);
    this.onResults = this.onResults.bind(this);
    this.calcScore = this.calcScore.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onPlay = this.onPlay.bind(this);
  }
  onNoteChange(value) {
    if (!this.guessed && this.start) {
      this.guess_stack.unshift('-');
      this.result_stack.unshift(false);
    }
    this.start = true;
    this.guessed = false;
    this.note_stack.unshift(value);
    this.setState({note: value});
  }
  onGuessChange(value) {
    if (!this.guessed)
      this.guess_stack.unshift(value);
    else
      this.guess_stack[0] = value;
    this.setState({guess: value});
    if (this.props.mode === 'guess') {
      var res = this.isCorrect() ? ' : Correct' : ' : Incorrect';
      this.setState({result: res});
    }
  }
  isCorrect() {
    if (this.guessed) 
      return false;
    this.guessed = true;
    if (this.note_stack[0] === this.guess_stack[0]) {
      this.result_stack.unshift(true);
      return true;
    }
    else {
      this.result_stack.unshift(false);
      return false;
    }
  }
  onPlay() {
    this.note_stack = [];
    this.guess_stack = [];
    this.result_stack = [];
    this.guessed = false;
    this.start = false;
    this.setState({
      note: '',
      guess: '',
      result: ''
    })
    this.props.setMode('play')
  }
  onStart() {
    this.note_stack = [];
    this.guess_stack = [];
    this.result_stack = [];
    this.guessed = false;
    this.start = false;
    this.setState({
      note: '',
      guess: '',
      result: ''
    })
    this.props.setMode('guess')
  }
  onContinue() {
    this.props.setMode('guess')
  }
  onResults() {
    this.props.setMode('results')
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

  render() {
    if (this.props.ui == null) {
      return (<p>Error displaying user interface!</p>);
    }
    if (this.props.mode === 'play') {
      return(
      <header className="App-header">
        <h1>Aural Training</h1> 
        <p>
          <Link to='/train'>
            <button className="App-button colorGreen" onClick={this.onStart}>
            Start
            </button>
          </Link>
          <Link to='/settings'>
            <button className="App-button colorCoral">Settings</button>
          </Link>
        </p>
        <p>Play a note!</p>
        <this.props.ui 
          onResults={this.onResults}
          onNoteChange={this.onNoteChange}
          onGuessChange={this.onGuessChange}
          isCorrect={this.isCorrect}
          note={this.state.note}
          guess={this.state.guess}
          result={this.state.result}
          mode={this.props.mode}
        />
      </header>
      );
    }
    else if (this.props.mode === 'guess') {
      return(
      <header className="App-header">
        <h1>Aural Training</h1> 
        <p>
          <Link to='/'>
            <button className="App-button colorGreen" onClick={this.onPlay}>Stop</button>
          </Link>
          <Link to='/settings'>
            <button className="App-button colorCoral">Settings</button>
          </Link>
          <Link to='/results'>
            <button className="App-button colorYellow" onClick={this.onResults}>
              Results
            </button>
          </Link>
        </p>
        <p>What Note Just Played?</p>
        <this.props.ui 
          onResults={this.onResults}
          onNoteChange={this.onNoteChange}
          onGuessChange={this.onGuessChange}
          isCorrect={this.isCorrect}
          note={this.state.note}
          guess={this.state.guess}
          result={this.state.result}
          mode={this.props.mode}
        />
      </header>
      );
    }
    else if (this.props.mode === 'results') {
      return(
        <header className="App-header">
          <h1>Results</h1> 
          <p>
            <Link to='/'>
              <button className="App-button colorGreen" onClick={this.onPlay}>Start Over</button>
            </Link>
            <Link to='/settings'> 
              <button className="App-button colorCoral">Settings</button>
            </Link>
            <Link to='/train'>
              <button className="App-button colorYellow" onClick={this.onContinue}>
                Continue
              </button>
            </Link>
          </p>
          <Results
            guesses ={this.guess_stack}
            notes   ={this.note_stack}
            results ={this.result_stack}
            score   ={this.calcScore()}
          />
        </header>
        );
    }
  }
}

export default TrainingSession;
