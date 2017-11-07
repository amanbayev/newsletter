import React, { Component } from 'react';

import { Link } from 'react-router-dom'

export default class SingleNewsComponent extends Component {
  constructor(props) {
    super(props)
  }

  returnNewsName() {
    return (this.props.singleNews) ? this.props.singleNews.title : ''
  }

  render() {
    if (this.props.loading) {
      return (
        <h1>Loading</h1>
      )
    } else {
      let news = this.props.singleNews;
      return (
        <div className="row">
          <ol className="breadcrumb">
            <li><Link to="/admin/dashboard">Дэшборд</Link></li>
            <li><Link to="/admin/news">Новости</Link></li>
            <li className="active"> {this.returnNewsName()} </li>
          </ol>
          <h3>Новость от {news.startDate}</h3>
          <a href={news.url} target="_blank"><h2>{news.title}</h2></a>
          <div dangerouslySetInnerHTML={{__html: news.content}}/>
          <Link to="/admin/news" className="btn btn-default">Назад <i className="fa fa-arrow-left"></i></Link>
        </div>
      )
    }
  }
}
