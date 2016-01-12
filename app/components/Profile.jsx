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
      Paper} = require('material-ui');


export default class Profile extends React.Component {

  constructor(props) {
  	 super(props);
  	 this.state = UserStore.getState();
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

  getProfileInfo() {
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
  		<h1 className={styles.about__description}> {firstName + " " + lastName + "'s Profile Page"}</h1>
  		<List>
  		<ListItem primaryText={firstName} />
  		<ListItem primaryText={lastName} />
  		<ListItem primaryText={gender} />
  		<ListItem primaryText={location} />
  		<ListItem primaryText={website} />


  		</List>
  		</div>
  		);
  }

  render() {
  	console.log(this.state.user);

    return (
      <div className={styles.about}>
        
        
        {this.getProfileInfo()}
      </div>
    );
  }
}
