import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import ToneGen from './ToneGenerator.js';

class TrainingSession extends React.Component {
  note_stack = [];
  guess_stack = [];
  guessed = false;

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
    this.guessed = false;
    this.note_stack.unshift(value)
    this.setState({note: value})
  }
  onGuessChange(value) {
    if (!this.guessed)
      this.guess_stack.unshift(value);
    else
      this.guess_stack[0] = value
    this.setState({guess: value});
    var res = this.isCorrect() ? ' : Correct' : ' : Incorrect';
    this.setState({result: res});
  }
  isCorrect() {
    if (this.guessed) 
      return false;
    this.guessed = true;
    return this.note_stack[0] === this.guess_stack[0];
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
    return Math.round(100 * (score / this.note_stack.length));
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
          score={this.calcScore()}
        />
      );
    }
    else {
      return (
        <Train 
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

function ResultItem(props) {
  return(
    <tr>
      <th>{props.guess}</th>
      <th>{props.note}</th>
    </tr>
  );
}

class Results extends React.Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
        <h1>Results</h1>
        <p>
          <Link to='/'>
            <button className="App-button colorGreen">Start Over</button>
          </Link>
          <Link to='/settings'>
            <button className="App-button colorCoral">Settings</button>
          </Link>
          <Link to='/train'>
            <button className="App-button colorYellow" onClick={this.props.onContinue}>
              Continue
            </button>
          </Link>
        </p>
        <h2>Total Score: {this.props.score}</h2>
        <table className='Results-table'>
          <thead>
            <tr>
              <th>Guess</th>
              <th>Note</th>
            </tr>
          </thead>
        <tbody>
          {this.props.guesses.map((guess, index) => (
            [guess, this.props.notes[index]]
            )).map((guess_note, index) => ( 
            <ResultItem key={index} guess={guess_note[0]} note={guess_note[1]} />
          ))}
        </tbody>
        </table>  
        </header>
      </div>
    );
  }

}

class Train extends React.Component {

  render() {
    return (
    <div className="App">
      <header className="App-header">
        <h1>Training</h1>
        <p>
          <Link to='/'>
            <button className="App-button colorGreen">Stop</button>
          </Link>
          <Link to='/settings'>
            <button className="App-button colorCoral">Settings</button>
          </Link>
          <Link to='/results'>
            <button className="App-button colorYellow" onClick={this.props.onResults}>
              Results
            </button>
          </Link>
        </p>
        <p>What Note Just Played?</p>
        <div>
          <ToneGen 
            onNoteChange={this.props.onNoteChange} 
            onGuessChange={this.props.onGuessChange} 
            isCorrect={this.props.isCorrect}
            mode='guess'
            b_name='Next'
          />
          <p>{this.props.guess}{this.props.result}</p>
        </div>
      </header>
    </div>
  );  
  }
}

export default TrainingSession;
export {Train, Results, TrainingSession};