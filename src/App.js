import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import './App.css';

import {TrainingData, TrainingSession} from './train.js';
import Piano from './piano.js';
import Results from './results.js';
import Settings from './settings.js';

var train_data = new TrainingData();

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      mode: 'play'
    };
    train_data = new TrainingData();
    this.setMode=this.setMode.bind(this);
  }
  setMode(mode) {
    this.setState({mode: mode});
  }
  onPlay() {
    train_data = new TrainingData();
    this.setMode('play');
  }
  onStart() {
    train_data = new TrainingData();
    this.setMode('guess');
  }
  onContinue() {
    this.setMode('guess');
  }
  onResults() {
    this.setMode('results');
  }
  render() {
    if (this.state.mode === 'play') {
      return(
        <PlayView 
          onStart={this.onStart}
          setMode={this.setMode}
        />
      );
    }
    else if (this.state.mode === 'guess') {
      return(
        <TrainView 
          onPlay={this.onPlay}
          onResults={this.onResults}
          setMode={this.setMode}
          train_data={this.UNSAFE_componentWillMount.train_data}
        />
      );
    }
    else if (this.state.mode === 'results') {
      return(
        <ResultsView
          train_data={train_data}
        />
      )
    }
  }
}

function PlayView (props) {
  return(
  <header className="App App-header">
    <h1>Aural Training</h1> 
    <p>
      <Link to='/train'>
        <button className="App-button colorGreen">
        Start
        </button>
      </Link>
      <Link to='/settings'>
        <button className="App-button colorCoral">Settings</button>
      </Link>
    </p>
    <p>Play a note!</p>
    <TrainingSession 
      mode='play'
      ui={Piano}
      setMode={props.setMode}
    />
  </header>
  )
}

function TrainView (props) {
  return (
  <header className="App App-header">
  <h1>Aural Training</h1> 
  <p>
    <Link to='/'>
      <button className="App-button colorGreen">Stop</button>
    </Link>
    <Link to='/settings'>
      <button className="App-button colorCoral">Settings</button>
    </Link>
    <Link to='/results'>
      <button className="App-button colorYellow">
        Results
      </button>
    </Link>
  </p>
  <p>What Note Just Played?</p>
  <TrainingSession 
      mode='guess'
      ui={Piano}
      setMode={props.setMode}
      train_data={train_data}
    />
  </header>
  );
}

function ResultsView (props) {
  // var train_data;
  // var onPlay;
  // if (props.train_data == null) 
  //   train_data = new TrainingData();
  // else
  //   train_data = props.train_data;
  return (
    <header className="App App-header">
    <h1>Results</h1> 
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
        guesses ={train_data.guess_stack}
        notes   ={train_data.note_stack}
        results ={train_data.result_stack}
        score   ={train_data.calcScore()}
      />
    </header>
  );
}


const Main = () => (
  <Switch>
    <Route exact path='/'         component={App}></Route>
    <Route exact path='/train'    component={TrainView}></Route>
    <Route exact path='/settings' component={Settings}></Route>
    <Route exact path='/results'  component={ResultsView}></Route>
  </Switch>
);

export default Main;
