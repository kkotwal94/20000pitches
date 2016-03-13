import React from 'react';
import PostsActions from 'actions/PostsActions';
import PostsStore from 'stores/PostsStore';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Immutable from 'immutable';
import style from 'scss/components/_layout';
import { PropTypes } from 'react-router';
const { 
      Menu,
      Card,
      CardActions,
      CardHeader,
      CardMedia,
      CardTitle,
      FlatButton,
      CardText,
      Mixins,
      Divider,
      ListItem,
      List,
      RaisedButton,
      Styles,  
      TextField,
      Paper,
  	  Snackbar } = require('material-ui');
const { Colors, Spacing, Typography } = Styles;

import styles from 'scss/components/_about';

export default class Gallery extends React.Component {
	constructor(props) {
		super(props);
		//this.state = UserStore.getState();
		this.state = PostsStore.getState();
	}

	componentDidMount() {
		PostsActions.allPosts();
		//UserStore.listen(this._onChange);
		PostsStore.listen(this._onChanges);
		
	}

	componentWillUnmount() {
		//UserStore.unlisten(this._onChange);
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
      singleposts: PostsStore.getState().singleposts,
      nestedComments: PostsStore.getState().nestedComments
    });
  }

  render() {
  	let posts = [];
  	posts = this.state.posts;
  	console.log(this.state.posts);
  	console.log(posts);

  	let displayNodes = posts.map((post, key) =>
  			
	       		<div className = {style.col + ' ' + style.col__col312} id = {"gallery" + key} key = {key}> 
	  			<Card>
	  				<CardHeader
	  					title={post.title}
	  					subtitle="pitch"
	  					avatar={post.thumbnail} />
	  				<CardMedia>
	  					<img style={{maxHeight:'400px'}} src={post.thumbnail} />
	  				</CardMedia>
	  				<CardText>
	  				Pitch Description
	  				</CardText>
	  				<CardActions>
	  					<FlatButton label="View"/>
	  					<FlatButton label="Like"/>
	  				</CardActions>
	  			</Card>

	  			
	  			
	  		</div>
	  		)
    return (
      <div className={styles.about}>
        <h1 className={styles.about__header}>Gallery page</h1>
        	<p className={styles.about__description}>Gallery stuff</p>
        	<div id="gallery">
        	<div className = {style.row + ' ' + style.row__group}>
	       	{displayNodes}
	       	</div>
       		</div>
       	</div>
    );
  }
}
