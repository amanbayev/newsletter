import React, { Component } from 'react';

import { withTracker } from 'meteor/react-meteor-data';

import {Newsletters} from '/imports/api/NewslettersCollection.js'
import SingleNewsletterComponent from '/client/imports/components/SingleNewsletterComponent'

export default withTracker( props => {
  const handle = Meteor.subscribe("Newsletters");
  let newsId = props.match.params.newsletterid
  return {
    currentUser: Meteor.user(),
    loading: !handle.ready(),
    singleNewsletter: Newsletters.findOne({name: newsId})
  }
})(SingleNewsletterComponent);
