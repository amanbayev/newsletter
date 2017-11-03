import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Authenticated from '/client/imports/components/Authenticated'
import Public from '/client/imports/components/Public'
import AdminComponent from '/client/imports/components/AdminComponent';

import LoginContainer from '/client/imports/containers/LoginContainer';
import NotFoundComponent from '/client/imports/components/NotFoundComponent'

const App = props => (
  <Router>
    <Switch>
      <Public exact path='/' component={ LoginContainer } {...props} />
      <Public exact path="/login" component={ LoginContainer } {...props} />
      <Authenticated path="/admin" component={ AdminComponent } {...props} />
      <Route component ={ NotFoundComponent } />
    </Switch>
  </Router>
)

export default withTracker(props => {

  const loggingIn = Meteor.loggingIn()
  const user = Meteor.user()
  const userId = Meteor.userId()
  const loading = Roles.subscription ? !Roles.subscription.ready() : true

  return {
    loggingIn,
    loading,
    user,
    userId,
    authenticated: !loggingIn && !!userId,
    roles: !loading && Roles.getRolesForUser(userId),
  }
})(App)
