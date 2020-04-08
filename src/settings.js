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

function Settings() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Settings</h1>
      <p>
        <NavLink to='/'>
          <button className="App-buttonXL colorGreen">Home</button>
        </NavLink>
        <NavLink to='/train'>
          <button className="App-buttonXL colorCoral">Start Training</button>
        </NavLink>
        <table className = "Setting-table">

        </table>
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
            <input className = "Input-Spinner" type="number" min="1" max="10" step="1" value = {max_leap.state.value}/>
            </th>

             <th>
            <select >
              <option value="Minor Second">Minor Second</option>
              <option value="Major Second">Major Second</option>
              <option value="Minor Third">Minor Third</option>
              <option value="Perfect Fourth">Perfect Fourth</option>
              <option value="Tritone">Tritone</option>
              <option value="Perfect Fifth">Perfect Fifth</option>
              <option value="Minor Sixth">Minor Sixth</option>
              <option value="Major Sixth">Major Sixth</option>
              <option value="Minor Seventh">Minor Seventh</option>
              <option value="Major Seventh">Major Seventh</option>
              <option value="Perfect Octave">Perfect Octave</option>
             </select>
             </th>

             <th>
            <select >
             <option value="Major">Major</option>
             <option value="Minor">Minor</option>
             <option value="Blues">Blues</option>
             <option value="Pentatonic">Pentatonic</option>
             <option value="Chromatic">Chromatic</option>
            </select>
            </th>
           </tr>        
         </tbody>

      </p>

      </header>

    </div>
  );
}

export default Settings;