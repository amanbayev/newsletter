import React, { Component } from 'react';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import {mfUploadFile, dataURLtoBlob, fileToBinaryString} from '/client/imports/general';

export default class ImageCropperComponent extends Component {
  constructor(props) {
    super(props)
    // this.props.context.
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
        this.props.context.setState({
          [stateName]: currentCanvas.toDataURL(),
          [`binary${stateName.capitalize()}`]: binaryString
        });
      });
    });

  }
  handleFileChange(e) {
    let file = e.target.files[0];
    let source = (window.URL ? URL : webkitURL).createObjectURL(file)

    this.props.context.setState({image: source})
  }
  render() {
    return (
      <div>
        <label>Картинка (320 х 180)</label>
        <input type="file" className="form-control" onChange={this.handleFileChange.bind(this)}/>
        <Cropper
          ref='cropper'
          src={this.props.context.state.image}
          id="cropper"
          style={{width: '100%', height: '360px', marginTop: '20px', marginBottom:'20px'}}
          cropBoxResizable={false}
          minCropBoxWidth={320}
          minCropBoxHeight={180}
          aspectRatio={320 / 180}
          minContainerWidth={550}
          minContainerHeight={360}
          viewMode={1}
          guides={true}
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
