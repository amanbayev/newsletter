import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Newsletters } from '/imports/api/NewslettersCollection.js'
import NewsletterComponent from '/client/imports/components/NewsletterComponent'

export default withTracker( props => {
  const handle = Meteor.subscribe("Newsletters");
  return {
    currentUser: Meteor.user(),
    loading: !handle.ready(),
    newsletters: Newsletters.find({active:true}).fetch()
  }
})(NewsletterComponent);
