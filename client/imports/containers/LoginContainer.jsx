import React, { Component } from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import LoginComponent from '/client/imports/components/LoginComponent'

export default withTracker( props => {
  const handle = Meteor.subscribe("allUsers");
  return {
    currentUser: Meteor.user(),
    loading: !handle.ready(),
    users: Meteor.users.find().fetch(),
  }
})(LoginComponent);
