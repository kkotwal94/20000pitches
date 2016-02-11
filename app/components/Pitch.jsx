import React, {Component} from 'react';
import {bindAll} from 'lodash';
import $ from 'jquery';
import image from 'images/pic.png';


export default class Pitch extends React.Component {

  constructor(props) {
  	super(props);
    this.state = {
      data_uri: null,
      processing: false
    }

    bindAll(this, 'handleFile', 'handleSubmit');
  }

  handleSubmit(e) {
    e.preventDefault();
    const _this = this;

    this.setState({
      processing: true
    });
    let data = new FormData(document.getElementById('formData'));
    const promise = $.ajax({
      url: '/file/video',
      type: "POST",
      data: data /*{
        data_uri: this.state.data_uri,
        filename: this.state.filename,
        filetype: this.state.filetype
      }*/,
      processData: false,
      contentType: false
      //dataType: 'json'
    });

    promise.done(function(data){
      _this.setState({
        processing: false,
        uploaded_uri: data.uri
      });
    });
  }

  
  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      });
      //console.log(this.state.data_uri);
    };

    reader.readAsDataURL(file);
  }

  render() {
    let processing;
    let uploaded;

    if (this.state.uploaded_uri) {
      uploaded = (
        <div>
          <h4>Image uploaded!</h4>
          <img className='image-preview' src={this.state.uploaded_uri} />
          <pre className='image-link-box'>{this.state.uploaded_uri}</pre>
        </div>
      );
    }

    if (this.state.processing) {
      processing = "Processing image, hang tight";
    }

    return (
      <div className='row' style={{marginTop: '40px'}}>
        <div className='col-sm-12'>
          <label>Upload an image</label>
          <form id = "formData" onSubmit={this.handleSubmit} encType="multipart/form-data">
            <input type="file" name="file" onChange={this.handleFile} />
            <input disabled={this.state.processing} className='btn btn-primary' type="submit" value="Upload" />
            {processing}
          </form>
          {uploaded}
        </div>
  <video id="my-video" className="video-js" controls preload="auto" width="800" height="600"
  poster={image} data-setup="{}">
    <source src="/file/56ad48f8d3c44588179ca1ed" type='video/mp4'/>
    
    <p className="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a web browser that
      <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
    </p>
  </video>
  </div>
      
    );
  }
}

//opm 56ad434d940d27501f56dac9
//parkour 56ad436e940d27501f56db19
//opm funny moments 56ad4905d3c44588179ca419
//anime cool shit 56ad48f8d3c44588179ca1ed
