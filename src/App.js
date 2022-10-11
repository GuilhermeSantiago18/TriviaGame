import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Config from './pages/Config';
import Game from './pages/Game';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Config } />
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default App;
