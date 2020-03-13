import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';


function Settings() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Settings</h1>
      <p>
        <NavLink to='/'>
          <button className="App-button colorGreen">Home</button>
        </NavLink>
        <NavLink to='/train'>
          <button className="App-button colorCoral">Start Training</button>
        </NavLink>
      </p>

      </header>
    </div>
  );
}

export default Settings;