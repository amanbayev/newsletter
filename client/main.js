import React from 'react'
import { render } from 'react-dom'

import App from '/client/imports/components/App';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

Meteor.startup(function(){
  render(
    <App />,
    document.getElementById('render-target')
  )
});
