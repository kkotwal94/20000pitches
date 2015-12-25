import React from 'react';
import {Route, Router} from 'react-router';

import App from 'components/App';
import About from 'components/About';
import Dashboard from 'components/Dashboard';
import Profile from 'components/Profile';
import LoginSignupPage from 'components/LoginSignupPage';
import Gallery from 'components/Gallery';

import UserStore from 'stores/UserStore';


function requireAuth(nextState, replaceState) {
  if (!UserStore.getState().user.get('authenticated')) {
    replaceState({ nextPathname: nextState.location.pathname }, '/login');
  }
}

export default (
  <Route component={App}>
    <Route path="/" component={Dashboard} />
    <Route path="dashboard" component={Dashboard}  />
    <Route path="about" component={About} />
    <Route path="profile" component={Profile} onEnter={requireAuth}/>
    <Route path="login" component={LoginSignupPage} />
    <Route path="gallery" component={Gallery} />
  </Route>
);
