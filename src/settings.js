import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';

function NumNotes(props) {
  return (
    <input 
        className="Input-Spinner" 
        type="number"
        min="1"
        max="10"
        step="1"
        value={props.default}
        onChange={(e) => props.setSettings("num_notes", e.target.value)}  
    />
  );
}

function MaxLeap(props) {
  return (
  <select 
      defaultValue={props.default}
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
  );
}

function Mode(props) {
  return (
  <select 
      defaultValue={props.default} 
      onChange={(e) => props.setSettings("mode", e.target.value)}
  >
    <option value="major">Major</option>
    <option value="minor">Minor</option>
    <option value="blues">Blues</option>
    <option value="pentatonic">Pentatonic</option>
    <option value="chromatic">Chromatic</option>
  </select>
  );
}

function NumOctaves(props) {
  return (
    <p>
    <input type = "radio" id = "one" name = "octaves" value = {1} 
        checked={props.default === 1} 
        onChange={(e) => props.setSettings("range", 1)}
    />
    <label for="one">One Octave</label><br></br>
    <input type = "radio" id = "two" name = "octaves" value = {2} 
        checked={props.default === 2} 
        onChange={(e) => props.setSettings("range", 2)}
    />
    <label for="two">Two Octaves</label>
    </p>
  )
}

function UI(props) {
  return (
    <select 
      defaultValue={props.default}
      onChange={(e) => props.setSettings("ui", e.target.value)}
    >
      <option value="staff">Staff</option>
      <option value="piano">Piano</option>
    </select>
  )
}

function Settings(props) {
  return (
  <div className="App-header">
  <header style={{padding:0}}>
    <h2>Settings</h2>
    <p>
      <NavLink to='/aural-skills'>
        <button className="App-buttonXL colorGreen">Home</button>
      </NavLink>
      <NavLink to='/aural-skills/train'>
        <button className="App-buttonXL colorCoral">Start</button>
      </NavLink>
    </p>
    
  </header>
  <table className="Setting-table">
  <tbody>
    <tr>
      <th className='Settings-table-cell'>Number of Notes:</th>
      <th className='Settings-table-cell'> 
        <NumNotes setSettings={props.setSettings} default={props.numNotes}/> 
      </th>
    </tr>
    <tr>
      <th className='Settings-table-cell'>Maximum Leap:</th>
      <th> 
        <MaxLeap setSettings={props.setSettings} default={props.maxLeap}/> 
      </th>
    </tr>
    <tr>
      <th className='Settings-table-cell'>Mode:</th>
      <th className='Settings-table-cell'> 
        <Mode setSettings={props.setSettings} default={props.mode}/> 
      </th>
    </tr>
    <tr>
      <th className='Settings-table-cell'>UI:</th>
      <th className='Settings-table-cell'> 
        <UI setSettings={props.setSettings} default={props.ui}/> 
      </th>
    </tr>
    <tr>
      <th className='Settings-table-cell'>Range:</th>
      <th className='Settings-table-cell'> 
        <NumOctaves setSettings={props.setSettings} default={props.range}/> 
      </th>
    </tr>
  </tbody>
  </table>
  </div>
  );
}

export default Settings;