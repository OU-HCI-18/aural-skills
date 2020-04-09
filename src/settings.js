import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';

const modes = {
  MAJOR : "major",
  MINOR : "minor",
  BLUES : 'blues',
  PENTATONIC :'pentatonic',
  CHROMATIC : 'chromatic'
}

function Settings(props) {
  return (
  <div>
  <header style={{padding:0}}>
    <h2>Settings</h2>
    <p>
      <NavLink to='/'>
        <button className="App-buttonXL colorGreen">Home</button>
      </NavLink>
      <NavLink to='/train'>
        <button className="App-buttonXL colorCoral">Start</button>
      </NavLink>
    </p>
    
  </header>
  <table className="Setting-table">
    <thead>
      <tr>
        <th className='Settings-table-cell'>Number of Notes</th>
        <th className='Settings-table-cell'>Max Leap</th>
        <th className='Settings-table-cell'>Mode</th>
      </tr>
    </thead>
    <tbody>
    <tr>
      <th>
      <input 
        className="Input-Spinner" 
        type="number"
        min="1"
        max="10"
        step="1"
        onChange={(e) => props.setSettings("num_notes", e.target.value)}  
      />
      </th>

        <th>
      <select 
        defaultValue={3}
        onChange={(e) => props.setSettings("max_leap", e.target.value)}
      >
        <option value={1}>Minor Second</option>
        <option value={2}>Major Second</option>
        <option value={3}>Minor Third</option>
        <option value={4}>Perfect Fourth</option>
        <option value={5}>Tritone</option>
        <option value={6}>Perfect Fifth</option>
        <option value={7}>Minor Sixth</option>
        <option value={8}>Major Sixth</option>
        <option value={9}>Minor Seventh</option>
        <option value={10}>Major Seventh</option>
        <option value={11}>Perfect Octave</option>
        </select>
        </th>

        <th>
      <select 
        defaultValue="major" 
        onChange={(e) => props.setSettings("mode", e.target.value)}
      >
        <option value="major">Major</option>
        <option value="minor">Minor</option>
        <option value="blues">Blues</option>
        <option value="pentatonic">Pentatonic</option>
        <option value="chromatic">Chromatic</option>
      </select>
      </th>
      </tr>        
    </tbody>
  </table>
  </div>
  );
}

export default Settings;