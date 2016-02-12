import React, {Component} from 'react';
import {bindAll} from 'lodash';
import $ from 'jquery';
import image from 'images/pic.png';
import styles from 'scss/components/_layout';

const { 
      Menu,
      Mixins,
      Divider,
      ListItem,
      List,
      RaisedButton,
      Styles,  
      TextField,
      Paper,
      Snackbar } = require('material-ui');  

const { StylePropable } = Mixins;
const { Colors, Spacing, Typography } = Styles;



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

    const style = {
    height: '300px',
    width: '100%',
    textAlign: 'center',
    display: 'inline-block',
  };

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

      
      <div style={{marginTop: '40px'}}>
      <div className={styles.row + ' ' + styles.row__group}>
      <div className = {styles.col + ' ' + styles.col__col312}>
      </div>
      <div className = {styles.col + ' ' + styles.col__col512}>
      <Paper style={style} zDepth={2}>
        
          
          
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Title"  hintText="Enter Title of Pitch" ref = "title"/>
          <br/>
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Description"  hintText="Enter description of pitch" ref = "description"/>          
          <br/>
          <div className='col-sm-12'>
          <label>Upload an Video Pitch</label>
          <form id = "formData" onSubmit={this.handleSubmit} encType="multipart/form-data">
            <input type="file" name="file" onChange={this.handleFile} />
            <br/>
            <input disabled={this.state.processing} className='btn btn-primary' type="submit" value="Submit" />
            {processing}
          </form>
          {uploaded}
        </div>
    
  </Paper>
  </div>

  </div>
  </div>
      
    );
  }
}

//opm 56ad434d940d27501f56dac9
//parkour 56ad436e940d27501f56db19
//opm funny moments 56ad4905d3c44588179ca419
//anime cool shit 56ad48f8d3c44588179ca1ed
