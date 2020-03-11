import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import './App.css';

import { TrainingSession } from './train.js';
import Settings from './settings.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Aural Training</h1>
        <p>
          <Link to='/train'>
            <button className="App-button colorGreen">Start</button>
          </Link>
          <Link to='/settings'>
            <button className="App-button colorCoral">Settings</button>
          </Link>
        </p>
        <p>Play a note!</p>
        <TrainingSession mode="play" b_name="Random"/>
      </header>
    </div>
  );
}


const Main = () => (
  <Switch>
    <Route exact path='/' component={App}></Route>
    <Route exact path='/train'    component={TrainingSession}></Route>
    <Route exact path='/settings' component={Settings}></Route>
    <Route exact path='/results'  component={TrainingSession}></Route>
  </Switch>
);

export default Main;
