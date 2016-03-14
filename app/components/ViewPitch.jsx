import React from 'react';
import PostsActions from 'actions/PostsActions';
import PostsStore from 'stores/PostsStore';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Immutable from 'immutable';
import { PropTypes } from 'react-router';
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';
import styles from 'scss/components/_video';
const isBrowser = typeof window !== 'undefined';
const MyWindowDependentLibrary = isBrowser ? require( 'scss/components/video.css') : undefined;

export default class ViewPitch extends React.Component {
	constructor(props) {
		super(props);
		this.state = UserStore.getState();
		this.states = PostsStore.getState();
    this.state.videoId = 0;
	}


    _showVideo = (id) => {
        this.setState({
            videoId: id
        }, this.reloadVideo);
    }

    _reloadVideo = () => {
        // When changing a HTML5 video, you have to reload it.
        this.refs.video.load();
        this.refs.video.play();
    }

    _togglePlay = () => {
        this.refs.video.togglePlay();
    }

    _toggleMute = () => {
        this.refs.video.toggleMute()
    }

    _fullscreen = () => {
        this.refs.video.fullscreen();
    }

    _load = () => {
        this.refs.video.load();
    }

    _play = () => {
        this.refs.video.play();
    }

    _pause = () => {
        this.refs.video.pause();
    }

    _unmute = () => {
        this.refs.video.unmute();
    }

    _mute = () => {
        this.refs.video.mute();
    }

    _seek = () => {
        this.refs.video.seek(this._seekInput.valueAsNumber);
    }

    _setVolume = () => {
        this.refs.video.setVolume(this._volumeInput.valueAsNumber);
    }

    _onProgress = () => {
        var el = ReactDOM.findDOMNode(this.refs.video).getElementsByTagName('video')[0];
        this.setState({
            percentageLoaded: el.buffered.length && el.buffered.end(el.buffered.length - 1) / el.duration * 100
        });
    }
	componentDidMount() {
		PostsActions.allPosts();
        let link = window.location.href;
        let linkArr = link.split('/');
        let valId = linkArr[linkArr.length-1];
        //console.log(valId);
        PostsActions.getPosts(valId);
		UserStore.listen(this._onChange);
		PostsStore.listen(this._onChanges);
		
	}

	componentWillUnmount() {
		UserStore.unlisten(this._onChange);
		PostsStore.unlisten(this._onChanges);
	}


	_onChange = () => {
  	this.setState({
      user: UserStore.getState().user
    });
  }

  _onChanges = () => {
  	this.setState({
      posts: PostsStore.getState().posts,
      singleposts: PostsStore.getState().singlePost,
      nestedComments: PostsStore.getState().nestedComments
    });
  }
  render() {
    let singleposts = {
        author: '',
        body: '',
        allComments: 0,
        author: "",
        body: "",
        comments: '',
        date: "",
        owner: "",
        thumbnail: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSn__rlpTc9Zwkh1yGjR0XkmnYsxx-SoW-4bjN6V-EGiI0EZ1ag",
        title: "",
        upvotes: 0,
        videoURL: "56e634d8b9f3abe814569f10",
    }
    let videoContent = (
       <div></div>
        );
    if(this.state.singleposts != undefined) {
        console.log("In if statement");
        singleposts = this.state.singleposts;
        videoContent = (
            <div style ={{marginLeft: "1%", width: '40%', max-width: '40%'}}>
                    <h1 className={styles.about__header} style={{textAlign: "center"}}> {singleposts.title}</h1>
        <Video poster={singleposts.thumbnail} controls ref="video" onProgress={this.onProgress}>
            <source src={"/file/" + singleposts.videoURL} type="video/webm" />
        </Video>
        </div>
        );
    }
    console.log(this.state.singleposts);
    console.log(singleposts);
    return (
      <div className={styles.about}>
        <div>
        {videoContent}
        </div>
        </div>
    );
  }
}

//856 x 480 is a good resolution