import React, { Component } from 'react';
import { Link } from 'react-router-dom'
export default class Dashboard extends Component {
  render() {
    return (
      <div className="row">

          <ol className="breadcrumb">
            <li className="active">Дэшборд</li>
          </ol>

            <h1>Дэшборд</h1>


          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="icon">
                <i className="glyphicon glyphicon-user" />
              </div>
              <div className="text">
                <var>2</var>
                <label className="text-muted">Всего пользователей</label>
              </div>
              <div className="options">
                <a href="javascript:;" className="btn btn-primary btn-lg"><i className="glyphicon glyphicon-plus" /> Add a guest</a>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="icon">
                <i className="glyphicon glyphicon-bullhorn" />
              </div>
              <div className="text">
                <var>0</var>
                <label className="text-muted">Всего новостей</label>
              </div>
              <div className="options">
                <a href="javascript:;" className="btn btn-default btn-lg"><i className="glyphicon glyphicon-search" /> View traffic</a>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="icon">
                <i className="glyphicon glyphicon-list" />
              </div>
              <div className="text">
                <var>1</var>
                <label className="text-muted">Ньюслеттеров</label>
              </div>
              <div className="options">
                <a href="javascript:;" className="btn btn-default btn-lg"><i className="glyphicon glyphicon-search" /> View orders</a>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="hero-widget well well-sm">
              <div className="icon">
                <i className="glyphicon glyphicon-book" />
              </div>
              <div className="text">
                <var>0</var>
                <label className="text-muted">Контактов</label>
              </div>
              <div className="options">
                <a href="javascript:;" className="btn btn-default btn-lg"><i className="glyphicon glyphicon-wrench" /> Edit profile</a>
              </div>
            </div>
          </div>

      </div>
    )
  }
}
