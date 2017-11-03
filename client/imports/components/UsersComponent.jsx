import React, { Component } from 'react';

import { Link } from 'react-router-dom'

export default class UsersComponent extends Component {
  renderUsers() {
    let users = this.props.users

    return users.map((user, index) => (
      <tr className="gradeX" key={ index }>
        <td>
          {user.profile.first_name} {user.profile.last_name}
        </td>
        <td>{ user.emails[0].address }</td>
        <td>{ user.roles }</td>
        <td>{ user.profile.company }</td>
      </tr>
    ))
  }
  render() {
    return (
      <div className="row">
        <ol className="breadcrumb">
          <li><Link to="/admin/dashboard">Дэшборд</Link></li>
          <li className="active">Пользователи</li>
        </ol>

        <h1>Пользователи</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">email</th>
              <th scope="col">Роль</th>
              <th scope="col">Компания</th>
            </tr>
          </thead>
          <tbody>
            {this.renderUsers()}
          </tbody>
        </table>
      </div>
    )
  }
}
