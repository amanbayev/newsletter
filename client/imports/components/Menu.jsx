import React from 'react';

import NavLink from './NavLink'

const Menu = () => {
  return (
    <div id="navbar" className="collapse navbar-collapse">
      <ul className="nav navbar-nav">
        <NavLink to='/admin'>Дэшборд</NavLink>
        <NavLink to="/admin/newsletters">Ньюслеттеры</NavLink>
        <NavLink to="/admin/news">Новости</NavLink>
        <NavLink to="/admin/contacts">Контакты</NavLink>
        <NavLink to='/admin/users'>Пользователи</NavLink>
        <li><a href="#" onClick={ ()=> {Meteor.logout()} }>Выйти</a></li>
      </ul>
    </div>
  )
}

export default Menu;
