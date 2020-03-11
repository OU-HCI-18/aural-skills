import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import Piano from './piano.js'
import Results from './results.js'
import ToneGen from './ToneGenerator.js';

class TrainingSession extends React.Component {
  note_stack = [];
  guess_stack = [];
  result_stack = [];

  guessed = false;
  start = false;
  constructor(props) {
    super(props);
    // make sure mode gets set correctly
    var mode = (props.mode) ? props.mode : 'guess';

    this.state = {
      note: '', 
      guess: '', 
      result: '',
      mode: mode
    };

    this.onNoteChange = this.onNoteChange.bind(this);
    this.onGuessChange = this.onGuessChange.bind(this);
    this.isCorrect = this.isCorrect.bind(this);
    this.onContinue = this.onContinue.bind(this);
    this.onResults = this.onResults.bind(this);
    this.calcScore = this.calcScore.bind(this);
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
    if (this.state.mode === 'guess') {
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
  onContinue() {
    this.setState({mode:'guess'})
  }
  onResults() {
    this.setState({mode:'show'})
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
    if (this.state.mode==='play') {
      return (
        <div>
        <ToneGen 
            onNoteChange={this.onNoteChange} 
            onGuessChange={this.onGuessChange} 
            isCorrect={this.isCorrect}
            mode={this.props.mode}
            b_name={this.props.b_name}
        />
        <p>{this.state.guess}{this.state.result}</p>
        </div>
      )
    }
    else if (this.state.mode==='show') {
      return (
        <Results 
          onContinue={this.onContinue}
          guesses={this.guess_stack}
          notes={this.note_stack}
          results={this.result_stack}
          score={this.calcScore()}
        />
      );
    }
    else {
      return (
        <Piano 
          onResults={this.onResults}
          onNoteChange={this.onNoteChange} 
          onGuessChange={this.onGuessChange} 
          isCorrect={this.isCorrect}
          guess={this.state.guess}
          result={this.state.result}
        />
      );
    }
  }
}

export default TrainingSession;
