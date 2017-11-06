import React, { Component } from 'react';

import CKEditor from "react-ckeditor-component";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '/client/imports/momentru.js'
import 'react-datepicker/dist/react-datepicker.css';

import ImageCropperComponent from '/client/imports/components/ImageCropperComponent'

export default class CreateNewsModal extends Component {
  constructor(props) {
    super(props)
    this.updateContent = this.updateContent.bind(this);
    this.state = {
      name: '',
      newsDate: moment(),
      content: 'Описание новости',
      image: '',
      url: ''
    }
    moment.locale('ru')
  }
  handleDateChange(date) {
    this.setState({
      newsDate: date
    })
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
    let newNews = this.state
    console.log("submit")
    newNews.newsDate = this.state.newsDate.format('DD.MM.YYYY')
    newNews.newsletterName = this.props.newsletterName
    // console.log(newNews.image)
    Meteor.call("createNews", newNews, function(error){
      if(error){
        console.log("error", error);
      } else {
        Bert.alert({
          title: 'Новость добавлена',
          message: 'Вы успешно создали новость, '+Meteor.user().profile.first_name,
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-user'
        });
      }
    });
    this.setState({
      name: '',
      newsDate: moment(),
      content: 'Описание новости',
      image: '',
      url: ''
    })
    $('#myModal').modal('hide');
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
                  <input className="form-control" placeholder="Название" value={this.state.name}
                    onChange={(e)=> {this.setState({name: e.target.value})}}/>
                </div>
                <div className="form-group">
                  <label>Дата</label>
                  <DatePicker
                    selected={this.state.newsDate}
                    className="form-control"
                    dateFormat="DD.MM.YYYY"
                    onChange={this.handleDateChange.bind(this)}
                  />
                </div>
                <div className="form-group">
                  <ImageCropperComponent context={this} />
                </div>
                <div className="form-group">
                  <label>Ссылка внешнаяя (необязательно)</label>
                  <input className="form-control" type="text" placeholder="URL"
                    value={this.state.url} onChange={(e)=>{this.setState({url: e.target.value})}} />
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
