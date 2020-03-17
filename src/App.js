import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import './App.css';

import TrainingSession from './train.js';
import Piano from './piano.js'
import Settings from './settings.js';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'play'
    };
    this.setMode=this.setMode.bind(this)
  }
  setMode(mode) {
    this.setState({mode: mode});
  }
  render() {
    return (
    <div className="App">
      <TrainingSession 
        mode={this.state.mode} 
        ui={Piano}
        setMode={this.setMode}
      />
    </div>
  );}
}


const Main = () => (
  <Switch>
    <Route exact path='/'         component={App}></Route>
    <Route exact path='/train'    component={App}></Route>
    <Route exact path='/settings' component={Settings}></Route>
    <Route exact path='/results'  component={App}></Route>
  </Switch>
);

export default Main;
