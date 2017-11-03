import React from 'react'
import { render } from 'react-dom'

import App from '/client/imports/components/App';

Meteor.startup(function(){
  render(
    <App />,
    document.getElementById('render-target')
  )
});
