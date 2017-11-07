import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import CKEditor from 'react-ckeditor-component'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import moment from 'moment'
import '/client/imports/momentru.js'

import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

export default class AddNewsComponent extends Component {
  zoomCropper(){
    this.refs.cropper.zoomTo(1);
  }

  constructor(props) {
    super(props)
    this.state = {
      startDate: moment(),
      title: '',
      content: '',
      content2: '',
      url: '',
      image: '',
      showLink: true,
      changingImage: false,
      hasImage: false,
      tempImageUrl: ''
    }
    moment.locale('ru')
  }

  handleSaveNews(e) {
    e.preventDefault()
    let newsItem = {}
    newsItem.startDate = this.state.startDate.format('DD.MM.YYYY')
    newsItem.title = this.state.title
    newsItem.content = this.state.content
    newsItem.url = this.state.url
    newsItem.image = this.state.image
    Meteor.call("createNews", newsItem, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        Bert.alert({
          title: 'Новость добавлена',
          message: 'Вы успешно создали новость, '+Meteor.user().profile.first_name,
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-user'
        });
        <Redirect to="/admin/news" />
      }
    });
  }

  handleCrop(e) {
    e.preventDefault();
    this.setState({
      image: this.refs.cropper.getCroppedCanvas().toDataURL(),
      hasImage: true,
      changingImage: false
    })
  }

  addImage(e) {
    e.preventDefault()
    if (this.state.showLink) {
      // from url input ref linkurl
      this.setState({ tempImageUrl: this.refs.linkurl.value })
    } else {
      // upload from PC input ref linklocalpc
      let file = this.refs.linklocalpc.files[0];
      let source = (window.URL ? URL : webkitURL).createObjectURL(file)

      this.setState({ tempImageUrl: source})
    }
    this.setState({changingImage: true})
  }

  renderAddImageArea() {
    if (this.state.hasImage && !this.state.changingImage) {
      return (
        <div>
          <img src={this.state.image} style={{height: '180px', width: '320px'}} />
          <br /><br />
          <button className="btn btn-warning" onClick={(e)=>{e.preventDefault(); this.setState({changingImage: true})}}>Изменить изображение <i className="fa fa-picture-o"></i></button>
        </div>
      )
    } else
    if (this.state.changingImage && !this.state.hasImage) {
      return (
        <div>
          <p>Используйте колески мыши для изменения масштаба</p>
          <Cropper
            ref='cropper'
            src={this.state.tempImageUrl}
            style={{height: 400, width: '100%'}}
            guides={false}
            viewMode={2}
            minCropBoxWidth={320}
            ready={this.zoomCropper.bind(this)}
            minCropBoxHeight={180}
            aspectRatio={320 / 180} />
          <br />
          <button className="btn btn-primary" onClick={this.handleCrop.bind(this)}>Обрезать <i className="fa fa-check"></i></button>
        </div>
      )
    } else {
      return (
        <div>
          <div className="form-group" data-toggle="buttons">
            <div className="btn-group">
              <label className="btn btn-default" onClick={(e)=>{ e.preventDefault(); this.setState({showLink:true})}} ><input type="radio"  />Ссылка</label>
              <label className="btn btn-default" onClick={(e)=>{ e.preventDefault(); this.setState({showLink:false})}} ><input type="radio"  />Загрузить</label>
            </div>
          </div>
          <div className="form-group">
            {this.renderLinkOrInput()}
          </div>
          <button className="btn btn-info" onClick={this.addImage.bind(this)}>Добавить изображение <i className="fa fa-picture-o"></i></button>
        </div>
      )
    }
  }

  updateContent(newContent) {
    this.setState({
      content: newContent
    })
  }

  updateContent2(newContent) {
    this.setState({
      content2: newContent
    })
  }

  onChange(evt){
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent
    })
  }

  onChange2(evt){
    var newContent = evt.editor.getData();
    this.setState({
      content2: newContent
    })
  }

  renderLinkOrInput() {
    if (this.state.showLink) {
      return (
        <input type="text" ref="linkurl" placeholder="введите ссылку на картинку" className="form-control" />
      )
    } else {
      return (
        <input ref="linklocalpc" className="form-control" type="file" />
      )
    }
  }

  render() {
    return (
      <div className="row">
        <ol className="breadcrumb">
          <li><Link to="/admin/dashboard">Дэшборд</Link></li>
          <li><Link to="/admin/news">Новости</Link></li>
          <li className="active">Создать новость</li>
        </ol>
        <h1>Создать новость</h1>
        <form onSubmit={this.handleSaveNews.bind(this)}>
          <div className="panel panel-default">
            <div className="panel-heading">Заполните форму</div>
            <div className="panel-body">
              <div className="form-group">
                <label>Ссылка на новость</label>
                <input className="form-control" type="text" placeholder="http://google.com" value={this.state.url} onChange={(e)=> (this.setState({url:e.target.value}))} />
              </div>
              <div className="form-group">
                <label>Дата публикации новости</label>
                <DatePicker
                  scrollableYearDropdown={true}
                  readOnly={true}
                  dateFormat="DD.MM.YYYY"
                  selected={this.state.startDate}
                  onChange={(date)=>(this.setState({startDate: date}))}
                  className="form-control"/>
              </div>
              <div className="form-group">
                <label>Название новости</label>
                <input className="form-control" placeholder="АО НК Kazakh Tourism что то сделал" type="text" value={this.state.title} onChange={(e)=> (this.setState({title:e.target.value}))} />
              </div>
              <div className="form-group">
                <label>Краткое описание</label>
                <CKEditor
                  content={this.state.content}
                  events={{
                    "change": this.onChange.bind(this)
                  }}
                 />
              </div>
              <div className="form-group">
                <label>Полное описание</label>
                
                <CKEditor
                  content={this.state.content2}
                  events={{
                    "change": this.onChange2.bind(this)
                  }}
                 />
              </div>
              <label>Изображение</label>
              <div className="form-group">
                {this.renderAddImageArea()}
              </div>
            </div>
            <div className="panel-footer">
                <div className="btn-group">
                  <button className="btn btn-success btn-lg" type="submit">Сохранить <i className="fa fa-floppy-o"></i></button>
                  <Link className="btn btn-danger btn-lg" to="/admin/news">Отмена <i className="fa fa-trash"></i></Link>
                </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
