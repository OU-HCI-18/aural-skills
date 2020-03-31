import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

import './App.css';
import TrainData from './train.js';
import {Piano , PianoPhone} from './piano.js';
import Results from './results.js';
import Settings from './settings.js';
import ToneGen from './ToneGenerator';

var trainData = new TrainData();
var toneGen = null;

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      ui : "computer"
    }

    this.onStart = this.onStart.bind(this);
    this.swapUI = this.swapUI.bind(this);
  }

  onStart() {
    console.log("resetting train data");
    trainData = new TrainData();
    toneGen = new ToneGen();
  }

  swapUI() {
    if (this.state.ui === "computer") {
      console.log("changing to phone");
      this.setState({ui : "phone"});
    }
    else {
      this.setState({ui : "computer"});
    }
  }

  render() {
    var ui;
    if (this.state.ui === "computer") {
      ui = Piano;
    }
    else {
      ui = PianoPhone;
    }
    return(
    <header className="App App-header">
      <h1>Aural Training</h1> 
      <button onClick={(e) => this.swapUI()}>UI</button>
      <BrowserRouter>
        <Switch>
          <Route path='/settings'>
            <Settings />
          </Route>
          <Route path='/results'>
            <ResultsView trainData={trainData}/>
          </Route>
          <Route path='/train'> 
            <TrainView trainData={trainData} replay={true} ui={ui}/> 
          </Route>
          <Route path='/'> 
            <PlayView onStart={this.onStart} ui={ui}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </header>
  );}
}

function PlayView (props) {
  // react hooks!
  const [note, setNote] = useState('');
  
  return (
  <div>
    <p>
      <Link to='/train'>
        <button className="App-button colorGreen" onClick={props.onStart}>Start</button>
      </Link>
      <Link to='/settings'>
        <button className="App-button colorCoral">Settings</button>
      </Link>
      <Link to='/results'>
        <button className="App-button colorYellow">Results</button>
      </Link>
    </p>
    <div>
      <p>Play a Note:</p>
      <props.ui 
        onNoteClick = {(note) => {
          console.log(note);
          // need to do it this way so that the AudioContext is created by the user
          // for Chrome
          if (toneGen === null) {
            toneGen = new ToneGen()
          }
          toneGen.play_note_button(note); 
          setNote(note)}
        }
      />
      <p>Note Played:</p>
      <p>{note}</p>
    </div>
  </div>
  );
}

function TrainView (props) {
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState(null);
  // const toneGen = new ToneGen();
  return (
    <div>
      <p>
        <Link to='/'>
          <button className="App-button colorGreen">Stop</button>
        </Link>
        <Link to='/settings'>
          <button className="App-button colorCoral">Settings</button>
        </Link>
        <Link to='/results'>
          <button className="App-button colorYellow">Results</button>
        </Link>
      </p>
      <div className="App">
        <div>
          {props.replay && 
              <button className="App-button colorYellow"
                  onClick={(e) => {
                    if (toneGen !== null) {
                      toneGen.play_note_button(trainData.note_stack[0])
                    }
                  }}>
                Replay
              </button>
            }
            <button className="App-button colorGreen"
                onClick={(e) => {
                  // need to do it this way so that the AudioContext is created by the user
                  // for Chrome
                  if (toneGen === null) {
                    toneGen = new ToneGen()
                  }
                  var note = toneGen.play_rand_note()
                  console.log(note)
                  trainData.addNote(note);
                }}>
              Next Note
            </button>
          </div>
          <props.ui
            onNoteClick = {(note) => {
              if (!trainData.guessed) {
                setGuess(note);
              }
              setResult(trainData.addGuess(note));
            }}
          />
        <p>You Guessed:</p>
        <p>{guess}{result === null ? '' : (result ? ' : Correct' : ' : Incorrect')}</p>
      </div>
    </div>
  );
}

function ResultsView (props) {
  return (
    <div> 
    <p>
      <Link to='/'>
        <button className="App-button colorGreen">Start Over</button>
      </Link>
      <Link to='/settings'> 
        <button className="App-button colorCoral">Settings</button>
      </Link>
      <Link to='/train'>
        <button className="App-button colorYellow">
          Continue
        </button>
      </Link>
    </p>
    <Results
        guesses = {trainData.guess_stack}
        notes   = {trainData.note_stack}
        results = {trainData.result_stack}
        score   = {trainData.calcScore()}
    />
  </div>
  );
}

export default App;
