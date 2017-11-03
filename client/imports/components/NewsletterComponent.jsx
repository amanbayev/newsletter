import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '/client/imports/momentru.js'
import 'react-datepicker/dist/react-datepicker.css';

export default class NewsletterComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creatingNewsletter: false,
      startDate: moment(),
      name: ''
    }
    moment.locale('ru')

  }
  handleChange(date) {
    this.setState({
      startDate: date
    })
  }
  handleNameChange(inputField) {
    this.setState({
      name: inputField.target.value
    })
  }
  createNewsletter(e) {
    e.preventDefault()
    let newsletterNew = {
      date: moment(this.state.startDate).format('DD.MM.YYYY'),
      name: this.state.name
    }
    let allNews = this.props.newsletters
    let found = false;
    for (singleS of allNews) {
      if (singleS.name == this.state.name) {
        found = true
        break
      }
    }
    if (found) {
      Bert.alert({
        title: 'Имя занято!',
        message: 'Такой URL уже есть. Смените URL ньюслеттера',
        type: 'danger',
        style: 'growl-top-right',
        icon: 'fa-ban'
      });
    } else {
      this.setState({
        creatingNewsletter: false,
        name: this.state.name
      })
      Meteor.call("createNewsletter", newsletterNew, function(error, result){
        if(error){
          Bert.alert({
            title: 'Ошибка!',
            message: error.reason,
            type: 'danger',
            style: 'growl-top-right',
            icon: 'fa-user'
          });
        }
        if(result){
          Bert.alert({
            title: 'Ньюслеттер создан',
            message: 'Вы успешно создали новую запись, '+Meteor.user().profile.first_name,
            type: 'success',
            style: 'growl-top-right',
            icon: 'fa-user'
          });
        }
      });
    }
  }
  renderCreateButton() {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      if (this.state.creatingNewsletter) {
        return (
          <div className="row">
            <div className="col-xs-12 col-md-4 col-md-offset-4">
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title">Создать ньюслеттер</h3>
                </div>
                <div className="panel-body">
                  <form onSubmit={this.createNewsletter.bind(this)}>
                    <div className="form-group">
                      <label>Date</label>
                      <DatePicker
                        selected={this.state.startDate}
                        className="form-control"
                        dateFormat="DD.MM.YYYY"
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Ссылка для URL (например, nl1)</label>
                      <input className="form-control"
                        value={this.state.name}
                        onChange={this.handleNameChange.bind(this)}
                      />
                    </div>
                    <div className="btn-group">
                      <button type="submit" className="btn btn-success">Создать &nbsp;<i className="fa fa-plus"></i></button>
                      <button className="btn btn-danger" onClick={()=>{this.setState({creatingNewsletter: false})}}>Отмена &nbsp;<i className="fa fa-trash"></i></button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="pull-right"><button className="btn btn-primary btn-lg" onClick={()=>{ this.setState({creatingNewsletter: true})}}>Создать &nbsp;<i className="fa fa-plus"></i></button></div>
        )
      }
    } else {
      return (<div></div>)
    }

  }
  handleRemove(event) {
    let newsletterId = $(event.target).attr("data-id")
    Meteor.call("deleteNewsletter", newsletterId, function(error, result){
      if(error){
        Bert.alert({
          title: 'Ошибка!',
          message: error.reason,
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-user'
        });
      }
      if(result){
        Bert.alert({
          title: 'Удалено',
          message: 'Вы успешно удалили запись, '+Meteor.user().profile.first_name,
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-user'
        });
      }
    });
  }
  renderNewsletters() {
    let newsletters = this.props.newsletters
    return newsletters.map((newsletter, index) => (
      <tr className="gradeX" key={ index }>
        <td>
          {index + 1}
        </td>
        <td>
          <Link to={`/admin/newsletters/${newsletter.name}`}>{ newsletter.date }</Link>
        </td>
        <td>
          {newsletter.name}
        </td>
        <td>
          <a className="btn btn-danger btn-sm" data-id={newsletter._id} onClick={this.handleRemove.bind(this)}><i className="fa fa-trash" data-id={newsletter._id}></i></a>
        </td>
      </tr>
    ))
  }
  render() {
    if (this.props.loading) {
      return (
        <h1><i className="fa fa-spin fa-gear"></i> Загрузка</h1>
      )
    } else {
      return (
        <div className="row">
          <ol className="breadcrumb">
            <li><Link to="/admin/dashboard">Дэшборд</Link></li>
            <li className="active">Ньюслеттеры</li>
          </ol>
          <h1>Ньюслеттеры</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">№</th>
                <th scope="col">Дата</th>
                <th scope="col">Ссылка URL</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              {this.renderNewsletters()}
            </tbody>
          </table>
          <hr />
          {this.renderCreateButton()}
        </div>
      )
    }
  }
}
