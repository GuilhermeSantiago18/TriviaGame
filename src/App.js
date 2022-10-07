import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Config from './pages/Config';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Config } />
      </Switch>
    );
  }
}

export default App;
