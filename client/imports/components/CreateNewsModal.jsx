import React, { Component } from 'react';

import CKEditor from "react-ckeditor-component";

export default class CreateNewsModal extends Component {
  constructor(props) {
    super(props)
    this.updateContent = this.updateContent.bind(this);
    this.state = {
      name: '',
      date: '',
      content: 'content',
      url: ''
    }
  }
  updateContent(newContent) {
    this.setState({
      content: newContent
    })
  }
  onChange(evt){
    // console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent
    })
  }
  onBlur(evt){
    // window blurred
  }

  afterPaste(evt){
    // after pase happened
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
                  <CKEditor
                    activeClass="p10"
                    content={this.state.content}
                    events={{
                      "blur": this.onBlur.bind(this),
                      "afterPaste": this.afterPaste.bind(this),
                      "change": this.onChange.bind(this)
                    }}
                   />
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
