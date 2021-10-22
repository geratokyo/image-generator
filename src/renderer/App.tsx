import React from 'react';
import { Route, Router, Switch } from "react-router-dom";
import { appHistory } from './AppConfig';
import { HomePage } from './pages/HomePage/Homepage_view';


function App() {
  return (
    <Router history={appHistory}>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
