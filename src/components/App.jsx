import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ThreeJsDemoContainer from './ThreeJsDemoContainer';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={ThreeJsDemoContainer} />
        <Route path='*' render={() =>
          <Redirect to='/' />
        } />
      </Switch>
    </div>
  );
}

export default App;
