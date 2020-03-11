import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';


function Settings() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Aural Training</h1>
        <p>Settings</p>
      <p>
        <NavLink to='/train'>
          <button className="App-button colorGreen">Start</button>
        </NavLink>
        <NavLink to='/settings'>
          <button className="App-button colorCoral">Settings</button>
        </NavLink>
      </p>
      </header>
    </div>
  );
}

export default Settings;