import React, { Component } from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import CreateNewsModal from '/client/imports/components/CreateNewsModal'
import { News } from '/imports/api/NewsCollection.js'

export default withTracker( props => {
  const handle = Meteor.subscribe("News");
  return {
    currentUser: Meteor.user(),
    loading: !handle.ready(),
    news: News.find().fetch(),
  }
})(CreateNewsModal);
