import React, { Component } from 'react';

export default class CreateNewsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      date: '',
      body: '',
      url: ''
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log("submit")
  }
  render() {
    return (
      <div className="modal fade" id="myModal" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
              <h4 className="modal-title" id="myModalLabel">Добавить новость</h4>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <label>Название новости</label>
                  <input className="form-control" placeholder="Название" />
                </div>
                <div className="form-group">
                  <label>Дата</label>
                  <input className="form-control" placeholder="Дата" />
                </div>
                <div className="form-group">
                  <label>Текст новости</label>
                  <textarea className="form-control" placeholder="Текст" />
                </div>
                <div className="btn-group">
                  <button type="button" className="btn btn-danger" data-dismiss="modal">Закрыть</button>
                  <button type="submit" className="btn btn-success">Сохранить</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
