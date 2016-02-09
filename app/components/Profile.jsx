import React from 'react';
import Link from 'react-router';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import styles from 'scss/components/_about';
import FullWidthSection from 'components/FullWidthSection';

const { 
       Avatar,
      FontIcon,
      Dialog,
      IconButton,
      EnhancedButton,
      Menu,
      Mixins,
      Divider,
      ListItem,
      List,
      RaisedButton,
      Styles,
      Tab,
      TextField,
      Tabs,
      Paper,
  	  Snackbar } = require('material-ui');
const { Colors, Spacing, Typography } = Styles;


export default class Profile extends React.Component {

  constructor(props) {
  	 super(props);
  	 this.state = UserStore.getState();
  	 this.state.autoHideDuration = 0;
  	 this.state.profileUpdateMessage = "Profile has been updated!";
  	 this.state.openSnack = false;
  }

  componentDidMount() {
  	UserActions.getProfile();
  	UserStore.listen(this._onChange);
  }

  componentWillUnmount() {
  	UserStore.unlisten(this._onChange);
  }

  _onChange = () => {
    this.setState({
      user: UserStore.getState().user
    });
  }

  _onProfileSubmit = () => {
    const firstName = this.refs.firstName.getValue();
    const lastName = this.refs.lastName.getValue();
    const gender = this.refs.gender.getValue();
    const website = this.refs.website.getValue();
    const location = this.refs.location.getValue();
    UserActions.updateProfile({
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      website: website,
      location: location
    });

    
  }

_handleActionTouchTap = () => {
    alert('Some action here....');
  };


_handleTouchTap = () => {
	this.setState({
		openSnack: true
	});
}

_handleRequestClose = () => {
    this.setState({
      openSnack: false
    });
}


  getProfileInfo() {

  	let styles = {
      root: {
        backgroundColor: "#4527A0",
      },
      content: {
        maxWidth: 700,
        padding: 0,
        margin: '0 auto',
        fontWeight: Typography.fontWeightLight,
        fontSize: 20,
        lineHeight: '28px',
        height: '100px',
        marginBottom: 13,
        letterSpacing: 0,
        color: Typography.textDarkBlack,
      },
      list: {
      	width: '45%',
      	float: 'left',
      	marginRight: '100px',
      	backgroundColor: '#2f2f2f'
      },

      update: {
      	width: '33%',
      	float: 'left',
      	backgroundColor: '#2f2f2f',
      	padding: '10px'
      },

      innerList: {
      	margin: '0 auto',
      	width: '95%',
      	marginBottom: '10px'
      }
  };

  	let firstName = "blah";
  	let lastName = "blah";
  	let gender = "loading"; 
  	let location = "loading";
  	let website = "loading";

  	if(this.state.user.get('data') === undefined) {
  		firstName = this.state.user.get('profile').get('firstName');
  		lastName = this.state.user.get('profile').get('lastName');
  		gender = this.state.user.get('profile').get('gender');
  		location = this.state.user.get('profile').get('location');
  		website = this.state.user.get('profile').get('website');

  	}

  	else {

  	firstName = this.state.user.get('data').get('firstName');
  	lastName = this.state.user.get('data').get('lastName');
  	gender = this.state.user.get('data').get('gender');
  	location = this.state.user.get('data').get('location');
  	website = this.state.user.get('data').get('website');

  }


  if(firstName == "") {
  	firstName = "Needs to be set";
  }

  if(lastName == "") {
  	lastName = "Needs to be set";
  }

  if(gender == "") {
  	gender = "Needs to be set";
  }

  if(location == "") {
  	location = "Needs to be set";
  }

  if(website == "") {
  	website = "Needs to be set";
  }

  	return (
  		<div>
  		<h1 className={styles.about__description} style={{color:"white"}}> {firstName + " " + lastName + "'s Profile Page"}</h1>
  		<FullWidthSection
        style={styles.root}
        useContent={false}
        contentStyle={styles.content}
        contentType="p"
        className="profileBio">

        <Paper style={styles.list}>

        <h1 style={{color:'white', paddingLeft: '10px'}}>{firstName + " 's bio"}</h1>

  		<List style={styles.innerList}>
  		<ListItem primaryText={firstName} />
  		<ListItem primaryText={lastName} />
  		<ListItem primaryText={gender} />
  		<ListItem primaryText={location} />
  		<ListItem primaryText={website} />
  		

  		</List>
  		</Paper>


  		<Paper style={styles.update} zDepth={2}>
  		<h2 style={{color: 'white'}}>Update Profile</h2>
  		<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Update First N." hintText="name.." ref = "firstName"/>
  		<br/>
  		<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Update Last N." hintText="last name.." ref = "lastName"/>
  		<br/>
  		<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Update Gender" hintText="M/F" ref = "gender"/>
  		<br/>
  		<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Location" hintText="State/Country" ref = "location"/>
  		<br/>
  		<TextField floatingLabelStyle = {{color: 'white'}} inputStyle = {{color: 'white'}} hintStyle = {{color: 'white'}} floatingLabelText="Website" hintText="Personal Site/Social Media" ref = "website"/>
  		<br/>
  		<RaisedButton label="Update Info!" primary={true} onClick={this._onProfileSubmit} onTouchTap={this._handleTouchTap}/>
  		</Paper>


  		</FullWidthSection>
  		</div>
  		);
  }

  render() {
  	console.log(this.state.user);

    return (
      <div className={styles.about} style={{backgroundColor: "#2F2F2F"}}>
        
        
        {this.getProfileInfo()}
      	 <Snackbar
          open={this.state.openSnack}
          message={this.state.profileUpdateMessage}
          action="Close"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this._handleActionTouchTap}
          onRequestClose={this._handleRequestClose} />
      </div>
    );
  }
}
