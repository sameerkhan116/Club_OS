import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import Profile from './Profile';
import SelectPlan from './SelectPlan';
import Navbar from './components/Navbar';

const Routes = () => (
  <Router>
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/user" render={() => <Redirect to="/" />} />
        <Route exact path="/user/:id" component={Profile} />
        <Route exact path="/select-plan" component={SelectPlan} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
