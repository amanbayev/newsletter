import React, { Component } from 'react';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import {mfUploadFile, dataURLtoBlob, fileToBinaryString} from '/client/imports/general';

export default class ImageCropperComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: 'http://via.placeholder.com/640x360/'
    }
  }
  _crop(){
    // image in dataUrl

  }
  saveCrop(e) {
    const currentCanvas = this.refs.cropper.getCroppedCanvas({
      width: this.props.width || 320,
      height: this.props.height || 180,
    });
    let stateName = 'image'
    currentCanvas.toBlob(blob => {
      fileToBinaryString(blob, binaryString => {
        this.setState({
          [stateName]: currentCanvas.toDataURL(),
          [`binary${stateName.capitalize()}`]: binaryString
        });
      });
    });
    // this.setState({image: this.refs.cropper.getCroppedCanvas().toDataURL() })
  }
  handleFileChange(e) {
    console.log(e.target.files[0])
  }
  render() {
    return (
      <div>
        <label>Картинка (320 х 180)</label>
        <input type="file" className="form-control" onChange={this.handleFileChange.bind(this)}/>
        <Cropper
          ref='cropper'
          src={this.state.image}
          style={{width: '100%', height: '220px', paddingTop: '20px', paddingBottom: '20px'}}
          cropBoxResizable={true}
          aspectRatio={320 / 180}
          minContainerWidth={320}
          minContainerHeight={180}
          viewMode={0}
          guides={false}
          crop={this._crop.bind(this)} />
        <button
          onClick={this.saveCrop.bind(this)}
          type="button"
          className="btn btn-default"
        >
          Вырезать
        </button>
      </div>
    )
  }
}
