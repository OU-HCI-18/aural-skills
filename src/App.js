import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

import './App.css';
import TrainData from './train.js';
import Results from './results.js';
import Settings from './settings.js';

import ToneGen from './ToneGenerator';

import Piano from './piano.js';
import Staff from './staff.js';

var trainData = new TrainData();
var toneGen = null;

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      // all settings for the app are stored here
      ui : "piano",   // ui to use
      
      replay : true,  // allow the user to replay notes
      
      max_leap : 5,   // maximum interval of toneGen
      mode : "major", // mode of toneGen
      num_notes: 4,   // number of notes to play at a time
      range: 1,       // range of toneGen
      gap : 1,        // seconds gap between notest
      duration: '4n', // note duration
      // synth to use
      // this is a nested object. That's usually bad
      // this means it will be hard to update 
      // (eg setState({synth : synth_obj}) will set this object,
      // NOT merge with it
      synth : {
        "oscillator" : {
          "type" : "triangle"
        },
        "envelope" : {
          "attackCurve" : "exponential",
          "attack" : 0.02,
          "decayCurve" : "exponential",
          "decay" : 0.03,
          "sustain" : 0.4,
          "releaseCurve" : "exponential",
          "release" : 0.5,
        },
        "portamento" : 0.0,
        "volume" : -15
      }
    }

    this.onStart = this.onStart.bind(this);
    this.swapRange = this.swapRange.bind(this);
    this.setSettings = this.setSettings.bind(this);
  }

  onStart() {
    console.log("resetting train data");
    trainData = new TrainData();
    toneGen = new ToneGen(this.state);
  }

  swapRange() {
    if (this.state.range === 1) {
      this.setState({range : 2});
    }
    else if (this.state.range === 2) {
      this.setState({range : 1});
    }
    // console.log("range", this.setState.range);
    toneGen = new ToneGen(this.state)
  }

  setSettings(setting, value) {
    if (setting === "num_notes") {
      this.setState({num_notes : value});
    } else if (setting === "max_leap") {
      this.setState({max_leap : value});
    } else if (setting === "mode") {
      this.setState({mode : value});
    } else if (setting === "range") {
      this.setState({range : value});
    } else if (setting === "ui") {
      this.setState({ui : value});
    }
  }

  render() {
    var ui;
    if (this.state.ui === "piano") {
      ui = Piano;
    }
    else if (this.state.ui === "staff") {
      ui = Staff;
    }
    return(
    <header className="App App-header">
      <h1>Aural Training</h1> 
      <BrowserRouter>
        <Switch>
          <Route path='/aural-skills/about'>
            <AboutView/>
          </Route>
          <Route path='/aural-skills/settings'>
            <Settings 
              setSettings={this.setSettings}
              numNotes={this.state.num_notes}
              maxLeap={this.state.max_leap}
              mode={this.state.mode}
              range={this.state.range}
              ui={this.state.ui}
            />
          </Route>
          <Route path='/aural-skills/results'>
            <ResultsView 
              trainData={trainData}
            />
          </Route>
          <Route path='/aural-skills/train'> 
            <TrainView 
              trainData = {trainData} 
              replay = {this.state.replay} 
              ui = {ui}
              duration = {this.state.duration}
              max_leap = {this.state.max_leap}
              mode = {this.state.mode}
              num_notes = {this.state.num_notes}
              range = {this.state.range}
              gap = {this.state.gap}
              synth = {this.state.synth}
            /> 
          </Route>
          <Route path='/aural-skills/'> 
            <PlayView 
              swapUI={this.swapUI}
              swapRange={this.swapRange}
              onStart={this.onStart} 
              ui={ui}
              duration = {this.state.duration}
              max_leap = {this.state.max_leap}
              mode = {this.state.mode}
              num_notes = {this.state.num_notes}
              range = {this.state.range}
              gap = {this.state.gap}
              synth = {this.state.synth}
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
      <Link to='/aural-skills/train'>
        <button className="App-button colorGreen" onClick={props.onStart}>Start</button>
      </Link>
      <Link to='/aural-skills/settings'>
        <button className="App-button colorCoral">Settings</button>
      </Link>
      <Link to='/aural-skills/about'>
        <button className="App-button colorYellow">About</button>
      </Link>
    </p>
    <div>
      <p>Play a Note:</p>
      <props.ui 
        mode = {props.mode}
        range = {props.range}
        onNoteClick = {(note) => {
          console.log(note);
          // need to do it this way so that the AudioContext is created by the user
          // for Chrome
          if (toneGen === null) {
            toneGen = new ToneGen(props)
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
  
  useEffect(() => {
    toneGen = new ToneGen(props);
    var note_arr = toneGen.play_rand_seq()
    setNotes(note_arr);
    // console.log(note_arr);
    trainData.addNoteArr(note_arr);
  }, []);

  return (
    <div>
      <p>
        <Link to='/aural-skills'>
          <button className="App-button colorGreen">Start Over</button>
        </Link>
        <Link to='/aural-skills/settings'>
          <button className="App-button colorCoral">Settings</button>
        </Link>
        <Link to='/aural-skills/results'>
          <button className="App-button colorYellow">Results</button>
        </Link>
      </p>
      <props.ui
            mode = {props.mode}
            range = {props.range}
            onNoteClick = {(note) => {
              var res = trainData.addGuess(note)
              if (res !== -1) {
                setGuess(note)
                setResult(res)
                toneGen.play_note(note);
              }
            }}
          />
        <p>You Guessed:</p>
        <p>{guess}{result === null ? '.' : (result ? ' : Correct' : ' : Incorrect')}</p>
      <div className="App">
        <div>
          {props.replay && 
              <button className="App-button colorYellow"
                  onClick={(e) => {
                    if (toneGen !== null) {
                      console.log("replay:", notes);
                      toneGen.play_notes(notes)
                    }
                  }}>
                Replay
              </button>
            }
            <button className="App-button colorPurple"
               onClick={(e) => {
                if (toneGen === null) {
                  toneGen = new ToneGen(props)
                }
                toneGen.play_notes(['C4','C5'])
              }}
            >
              Play C
            </button>
            <button className="App-button colorGreen"
                onClick={(e) => {
                  // need to do it this way so that the AudioContext is created by the user
                  // for Chrome
                  if (toneGen === null) {
                    toneGen = new ToneGen(props)
                  }
                  var note_arr = toneGen.play_rand_seq()
                  setNotes(note_arr);
                  console.log(note_arr);
                  trainData.addNoteArr(note_arr);
                }}>
              Next Melody
            </button>
          </div>
      </div>
    </div>
  );
}

function ResultsView (props) {
  return (
    <div> 
    <p>
      <Link to='/aural-skills'>
        <button className="App-button colorGreen">Start Over</button>
      </Link>
      <Link to='/aural-skills/settings'> 
        <button className="App-button colorCoral">Settings</button>
      </Link>
      <Link to='/aural-skills/train'>
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

function AboutView (props) {
  return(
  <div>
  <p>
    <Link to='/aural-skills'>
      <button className="App-button colorGreen">Home</button>
    </Link>
    <Link to='/aural-skills/settings'> 
      <button className="App-button colorCoral">Settings</button>
    </Link>
    <Link to='/aural-skills/train'>
      <button className="App-button colorYellow">Start</button>
    </Link>
  </p>
  <div className="App App-header">
    <p>This website is a group project for CS 4063, Human Computer Interaction</p>
    <p>This application is designed to help musicians of all skill levels and 
    experiences refine their aural skills. Customize the exercises to fit your 
    needs in the settings tab and check your progress in the results tab. Have fun!</p>
    <p/>
    <p>Note that this page works best on a desktop - mobile use is experimental.</p>
  </div>
  </div>
  );
}

export default App;
