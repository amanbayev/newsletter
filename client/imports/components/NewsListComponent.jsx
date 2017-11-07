import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class NewsListComponent extends Component {
  constructor(props) {
    super(props)
  }
  handleRemove() {
    return true;
  }
  renderNews() {
    let newslist = this.props.newslist
    return newslist.map((singlenews, index) => (
      <tr className="gradeX" key={ index }>
        <td>
          {index + 1}
        </td>
        <td>
          <Link to={`/admin/news/${singlenews._id}`}>{ singlenews.startDate }</Link>
        </td>
        <td>
          <img src={singlenews.image} style={{width:'320px'}} />
        </td>
        <td>
          <Link to={`/admin/news/${singlenews._id}`}>{singlenews.title}</Link>
        </td>
        <td>
          <a className="btn btn-danger btn-sm" data-id={singlenews._id} onClick={this.handleRemove.bind(this)}>
            <i className="fa fa-trash" data-id={singlenews._id}></i>
          </a>
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
            <li className="active">Новости</li>
          </ol>
          <h1>Новости</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">№</th>
                <th scope="col">Дата</th>
                <th scope="col">Фото</th>
                <th scope="col">Название</th>
                <th scope="col">Действия</th>
              </tr>
            </thead>
            <tbody>
              {this.renderNews()}
            </tbody>
          </table>
          <div className="pull-right">
            <Link
              to="/admin/news/create"
              className="btn btn-primary btn-lg">
                Создать &nbsp;<i className="fa fa-plus"></i>
            </Link>
          </div>
        </div>
      )
    }
  }
}
