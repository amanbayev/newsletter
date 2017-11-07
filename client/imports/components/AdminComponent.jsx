import React, { Component } from 'react';

import {
  Route,
  Switch,
  Link
} from 'react-router-dom'

import Authenticated from '/client/imports/components/Authenticated'
import Menu from '/client/imports/components/Menu'
import Dashboard from '/client/imports/components/Dashboard'
import NotFoundComponent from '/client/imports/components/NotFoundComponent'
import AddNewsComponent from '/client/imports/components/AddNewsComponent'

// containers
import UsersContainer from '/client/imports/containers/UsersContainer'
import NewsletterContainer from '/client/imports/containers/NewsletterContainer'
import SingleNewsletterContainer from '/client/imports/containers/SingleNewsletterContainer'
import NewsListContainer from '/client/imports/containers/NewsListContainer'
import SingleNewsContainer from '/client/imports/containers/SingleNewsContainer'


export default class AdminComponent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link className="navbar-brand" to="/">QT Newsletter</Link>
            </div>
            <Menu/>
          </div>
        </nav>
        <div className="container">
          <Switch>
            <Route exact path="/admin" component={Dashboard} />
            <Route exact path="/admin/users" component={UsersContainer} />
            <Route exact path="/admin/newsletters" component={NewsletterContainer } />
            <Route exact path="/admin/newsletters/:newsletterid" component={SingleNewsletterContainer } />
            <Route exact path="/admin/news" component={ NewsListContainer } />
            <Route exact path="/admin/news/create" component={ AddNewsComponent } />
            <Route exact path="/admin/news/:newsid" component={ SingleNewsContainer }/>
            <Route component={ NotFoundComponent } />
          </Switch>
        </div>{/* /.container */}
      </div>
    )
  }
}
