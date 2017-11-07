import React, { Component } from 'react';

import { withTracker } from 'meteor/react-meteor-data';

import SingleNewsComponent from '/client/imports/components/SingleNewsComponent'
import { News } from '/imports/api/NewsCollection.js'

export default withTracker( props => {
  const handle = Meteor.subscribe("News");
  let newsId = props.match.params.newsid
  return {
    currentUser: Meteor.user(),
    loading: !handle.ready(),
    singleNews: News.findOne({_id: newsId})
  }
})(SingleNewsComponent);
