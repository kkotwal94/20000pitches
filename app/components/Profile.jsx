import React from 'react';
import Link from 'react-router';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import styles from 'scss/components/_about';

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
  	let firstName, lastName, gender, location, website;

  	if(this.state.user.get('data') === undefined) {
  		firstName = this.state.user.get('profile').get('firstName');
  	}


  	firstName = this.state.user.get('data').get('firstName');
  	lastName = this.state.user.get('data').get('lastName');
  	gender = this.state.user.get('data').get('gender');
  	location = this.state.user.get('data').get('location');
  	website = this.state.user.get('data').get('website');


  	return (
  		<List>
  		<ListItem primaryText={this.state.user.get('data').get('firstName')} />
  		<ListItem primaryText={this.state.user.get('data').get('lastName')} />
  		<ListItem primaryText={this.state.user.get('data').get('gender')} />
  		<ListItem primaryText={this.state.user.get('data').get('location')} />
  		<ListItem primaryText={this.state.user.get('data').get('Website')} />


  		</List>
  		);
  }

  render() {
  	console.log(this.state.user);

    return (
      <div className={styles.about}>
        <h1 className={styles.about__header}>Profile page</h1>
        <p className={styles.about__description}>Profile stuff</p>
        {this.getProfileInfo()}
      </div>
    );
  }
}
