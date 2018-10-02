import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ThreeJsDemoContainer from './ThreeJsDemoContainer';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={ThreeJsDemoContainer} />
          <Route path='*' render={() =>
            <Redirect to='/' />
          } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
