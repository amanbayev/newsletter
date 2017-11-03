import React, { Component } from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom'

import NotFoundComponent from '/client/imports/components/NotFoundComponent'
import CreateNewsModal from '/client/imports/components/CreateNewsModal'

export default class SingleNewsletterComponent extends Component {
  constructor(props) {
    super(props)
  }
  renderNewsletter() {
    let newsletter = this.props.singleNewsletter
    if (!this.props.loading) {
      if (newsletter) {
        return (
          <div>
            <div className="row">
              <div className="col-xs-12 col-md-6">
                <a className="btn btn-default" onClick={this.props.history.goBack.bind(this)}>
                  <i className="fa fa-arrow-left"></i>&nbsp; Вернуться к списку
                </a>
                <h1>Ньюслеттер "{newsletter.name}"</h1>
                <h4>от {moment(newsletter.date).format('DD MMMM YYYY')}</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        #
                      </th>
                      <th>
                        Название новости
                      </th>
                      <th>
                        Тело
                      </th>
                      <th>
                        Картинка
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Test</td>
                      <td>Lorem ipsum dolor amet.</td>
                      <td><img src="http://via.placeholder.com/320x180"/></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <hr />
                  <div className="btn-group pull-right">
                    <button className="btn btn-default btn-lg"
                     onClick={this.props.history.goBack.bind(this)}
                    >Вернуться назад &nbsp;<i className="fa fa-arrow-left"></i></button>
                    <button className="btn btn-default btn-lg">Печать &nbsp;<i className="fa fa-print"></i></button>
                    <button className="btn btn-default btn-lg" data-toggle="modal" data-target="#myModal">Добавить новость &nbsp;<i className="fa fa-plus"></i></button>
                    <button className="btn btn-primary btn-lg">Сохранить изменения &nbsp;<i className="fa fa-save"></i></button>
                  </div>
                </div>
                <CreateNewsModal />
              </div>
            </div>
          </div>
        )
      } else {
        return <NotFoundComponent message='Ньюслеттер не найден' />
      }
    } else {
      return (
        <h1><i className="fa fa-spin fa-gear"></i> Загрузка</h1>
      )
    }
  }

  returnNewsletterName() {
    let singleNewsletter = this.props.singleNewsletter
    if (singleNewsletter)
      return singleNewsletter.name
    else
      return ''
  }
  render() {
    return (
      <div className="row">
        <ol className="breadcrumb">
          <li><Link to="/admin/dashboard">Дэшборд</Link></li>
          <li><Link to="/admin/newsletters">Ньюслеттеры</Link></li>
          <li className="active"> {this.returnNewsletterName()} </li>
        </ol>
        {this.renderNewsletter()}
      </div>
    )
  }
}
