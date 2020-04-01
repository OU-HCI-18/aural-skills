import React, { useState } from 'react';
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
      ui : "piano",
      range: 2,
      duration: '4n',
      num: 3,
      gap: 1
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
    if (this.state.range === 1) {
      this.setState({range : 2});
      console.log(this.state);
    }
    else if (this.state.range === 2) {
      this.setState({range : 1});
      console.log(this.state);
    }
  }

  render() {
    var ui;
    if (this.state.ui === "piano") {
      if (this.state.range === 1) {
        ui = PianoPhone;
      }
      else {
        ui = Piano;
      }
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
            <ResultsView 
              trainData={trainData}
            />
          </Route>
          <Route path='/train'> 
            <TrainView 
              trainData={trainData} 
              replay={true} 
              ui={ui}
              range={this.state.range}
              duration={this.state.duration}
              num={this.state.num}
              gap={this.state.gap}
            /> 
          </Route>
          <Route path='/'> 
            <PlayView 
              onStart={this.onStart} 
              ui={ui}
              range={this.state.range}
              duration={this.state.duration}
              num={this.state.num}
              gap={this.state.gap}
            />
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
          toneGen.play_note(note); 
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
  const [notes, setNotes] = useState('');
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
                      toneGen.play_notes(notes, props.duration, props.gap)
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
                  var note_arr = toneGen.play_rand_seq(props.duration, props.gap)
                  setNotes(note_arr);
                  // console.log(note_arr)
                  trainData.addNoteArr(note_arr);
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
