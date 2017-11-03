import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class NotFoundComponent extends Component {
  constructor(props) {
    super(props)
  }
  getMessage() {
    if (this.props.message)
      return (
        <div>
          <h1>404</h1><h1>{this.props.message}</h1>
        </div>
      )
    else
      return (
        <div>
          <h1>404</h1><h1>Страница не найдена</h1>
        </div>
      )
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <center>
            {this.getMessage()}
            <img src="/travolta.gif" height={300}/><br/><br/>
            <Link to="/" className="btn btn-lg btn-primary">Вернуться на главную</Link>
          </center>
        </div>
      </div>
    )
  }
}

export default NotFoundComponent;
