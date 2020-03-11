import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import ToneGen from './ToneGenerator.js';

class Piano extends React.Component {

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

export default Piano;
