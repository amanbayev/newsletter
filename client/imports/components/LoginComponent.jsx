import React, { Component } from 'react';

export default class LoginComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputLogin: '',
      inputPassword: '',
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let login = this.state.inputLogin
    let password = this.state.inputPassword
    // console.log(login+" "+password);
    Meteor.loginWithPassword(login, password, function(error){
      if (error) {
        Bert.alert({
          title: 'Ошибка!',
          message: error.reason,
          type: 'danger',
          style: 'growl-top-right',
          icon: 'fa-user'
        });
      } else {
        Bert.alert({
          title: 'Вы вошли',
          message: 'Добро пожаловать, '+Meteor.user().profile.first_name,
          type: 'info',
          style: 'growl-top-right',
          icon: 'fa-user'
        });
      }
    })
  }

  handleLoginChange(e) {
    this.setState({inputLogin: e.target.value})
  }

  handlePasswordChange(e) {
    this.setState({inputPassword: e.target.value})
  }

  render() {
    return (
      <div className="signing-body">
        <div className="container">
          <form className="form-signin" onSubmit={this.handleSubmit.bind(this)}>
            <h2 className="form-signin-heading">Войдите в систему</h2>
            <label htmlFor="inputEmail" className="sr-only">Email</label>
            <input
              type="email" ref="inputEmail"
              onChange={ this.handleLoginChange.bind(this) }
              className="form-control" placeholder="Email"
              required autoFocus />
            <label htmlFor="inputPassword" className="sr-only">Пароль</label>
            <input
              type="password" ref="inputPassword"
              onChange={ this.handlePasswordChange.bind(this) }
              className="form-control" placeholder="Пароль" required />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Войти</button>
          </form>
        </div>
      </div>
    )
  }
}
