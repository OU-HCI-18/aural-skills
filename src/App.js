import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

import './App.css';
import TrainData from './train.js';
import Piano from './piano.js';
import Results from './results.js';
import Settings from './settings.js';
import ToneGen from './ToneGenerator';

var trainData = new TrainData();
var toneGen = null;

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.onStart = this.onStart.bind(this);
  }
  onStart() {
    console.log("resetting train data");
    trainData = new TrainData();
    toneGen = new ToneGen();
  }

  render() {
    return(
    <header className="App App-header">
      <h1>Aural Training</h1> 
      <BrowserRouter>
        <Switch>
          <Route path='/settings'>
            <Settings />
          </Route>
          <Route path='/results'>
            <ResultsView trainData={trainData}/>
          </Route>
          <Route path='/train'> 
            <TrainView trainData={trainData} ui={Piano}/> 
          </Route>
          <Route path='/'> 
            <PlayView onStart={this.onStart} ui={Piano}/> 
          </Route>
        </Switch>
      </BrowserRouter>
    </header>
  );}
}

function PlayView (props) {
  // react hooks!
  const [note, setNote] = useState('');

  useEffect(() => {
    console.log(note);
    // need to do it this way so that the AudioContext is created by the user
    // for Chrome
    if (toneGen === null) {
      toneGen = new ToneGen()
    }
    toneGen.play_note_button(note); 
  });
  
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
      <p>Play a note!</p>
      <props.ui 
        onNoteClick = {(note) => setNote(note)}
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
        <p>What Note Just Played?</p>
        <props.ui
          onNoteClick = {(note) => {
            if (!trainData.guessed) {
              setGuess(note);
            }
            setResult(trainData.addGuess(note));
          }}
        />
        <button className="App-button colorYellow"
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
