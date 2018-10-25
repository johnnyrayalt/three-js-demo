import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainContainer from './MainContainer'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={MainContainer} />
        <Route path='*' render={() =>
          <Redirect to='/' />
        } />
      </Switch>
    </div>
  );
}

export default App;
