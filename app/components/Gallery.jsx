import React from 'react';
import PostsActions from 'actions/PostsActions';
import PostsStore from 'stores/PostsStore';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import Immutable from 'immutable';
import style from 'scss/components/_layout';
import { PropTypes, Link} from 'react-router';
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
      postsCopy: PostsStore.getState().posts,
      singleposts: PostsStore.getState().singleposts,
      nestedComments: PostsStore.getState().nestedComments
    });
  }

  _upvote = () => {
    //upvote here
    console.log("Im upvoting this post");
  }

  _authorSearch = (event) => {
    let updatedList = this.state.postsCopy;
    updatedList = updatedList.filter(function(item) {
      return item.author.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
});
    this.setState({posts: updatedList});
  }

  _titleSearch = (event) => {
     let updatedList = this.state.postsCopy;
    updatedList = updatedList.filter(function(item) {
      return item.title.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({posts: updatedList});
  }
  

  _likesSearch = (event) => {
  let updatedList = this.state.postsCopy;
    updatedList = updatedList.filter(function(item) {
      return item.likes.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
  });
    this.setState({posts: updatedList});
  
  }

  _viewsSearch = (event) => {
  let updatedList = this.state.postsCopy;
    updatedList = updatedList.filter(function(item) {
      return item.views.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
  });
    this.setState({posts: updatedList});
  
  }

  render() {
  	let posts = [];
  	posts = this.state.posts;
  	console.log(this.state.posts);
  	console.log(posts);

  	let displayNodes = posts.map((post, key) =>
  			
	       		<div className = {style.col + ' ' + style.col__col312} style={{minHeight: "590px"}}id = {"gallery" + key} key = {key}> 
	  			<Card>
	  				<CardHeader
	  					title={post.title}
	  					subtitle="pitch"
	  					avatar={post.thumbnail} />
	  				<CardMedia>
	  					<img style={{maxHeight:'400px'}} src={post.thumbnail} />
	  				</CardMedia>
	  				<CardText style={{textOverflow: "ellipsis",
    width: "95%",
    whiteSpace: "nowrap",
    overflow: "hidden"}} >
	  				{post.body}
            <br/>
            <Link to={"/user/" + post.owner}>{"By " + post.author}</Link>
	  				</CardText>
	  				<CardActions>
	  					<Link to={"/gallery/" + post._id}><FlatButton label="View"/></Link>
	  					<FlatButton label="Like" onClick={this._upvote}/>
	  				</CardActions>
	  			</Card>

	  			
	  			
	  		</div>
	  		)
    return (
      <div className={styles.about}>
        <h1 style={{textAlign: "center"}}>Gallery</h1>
        	<TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Search by Pitch Title"  hintText="Search by Pitch Title" ref = "title" name="title" onChange={this._titleSearch}/> &nbsp;
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Search by Pitch Author"  hintText="Search by Pitch Author" ref = "author" name="author" onChange={this._authorSearch}/> &nbsp;
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Search by Pitch Likes"  hintText="Search by Pitch Likes" ref = "likes" name="likes" onChange={this._likesSearch}/> &nbsp;
          <TextField floatingLabelStyle = {{color: 'black'}} inputStyle = {{color: 'black'}} hintStyle = {{color: 'black'}} floatingLabelText="Search by Pitch Views"  hintText="Search by Pitch views" ref = "views" name="views" onChange={this._viewsSearch}/> &nbsp;
        	<div id="gallery">
        	<div className = {style.row + ' ' + style.row__group}>
	       	{displayNodes}
	       	</div>
       		</div>
       	</div>
    );
  }
}
