import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Config from './pages/Config';
import Game from './pages/Game';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Config } />
        <Route path="/game" component={ Game } />
      </Switch>
    );
  }
}

export default App;
