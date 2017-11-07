import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { News } from '/imports/api/NewsCollection.js'
import NewsListComponent from '/client/imports/components/NewsListComponent'

export default withTracker( props => {
  const handle = Meteor.subscribe("News");
  return {
    currentUser: Meteor.user(),
    loading: !handle.ready(),
    newslist: News.find({active:true}).fetch()
  }
})(NewsListComponent);
