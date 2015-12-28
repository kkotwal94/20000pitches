import React from 'react';
import Link from 'react-router';
import UserActions from 'actions/UserActions';
import UserStore from 'stores/UserStore';
import FullWidthSection from 'components/FullWidthSection';
import LoginSignupPage from 'components/LoginSignupPage';
import io from 'socket.io-client';
import styles from 'scss/components/_chat.scss';
import MobileTearSheet from 'components/MobileTearSheet';
const { AppBar,
      AppCanvas,
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
      Tabs,
      Paper} = require('material-ui');

const { StylePropable } = Mixins;
const { Colors, Spacing, Typography } = Styles;
import {PropTypes} from 'react-router';
import chromecon from 'images/chrome.png';

let socket = io('http://localhost:3000');
export default class Dashboard extends React.Component {

  

  constructor(props) {
  	super(props);
	  this.state = UserStore.getState();
    this.state.open = false;
    console.log(socket);
    socket.on('news', function(data) {
        console.log(data);
    });
  }


handleDialogOpen = () => {
    this.setState({open: true});
    //alert("hellow world");
  }
  

  handleDialogClose = () => {
    this.setState({open: false});
  }

 static contextTypes = {
        router: React.PropTypes.func
    }

  componentDidMount() {
    UserStore.listen(this._onChange);
    //let socket = io();
    //console.log(socket);
  }

   componentWillUnmount() {
    UserStore.unlisten(this._onChange);
  }

   _onChange = () => {
    this.setState({
      user: UserStore.getState().user
    });
  }
  
  componentWillReceiveProps(nextProps, nextContext) {

  }

  _createPitch = () => {
    this.context.history.pushState(null, '/pitch');
  }

  _ATransition = () => {
    this.context.history.pushState(null, '/about');
  }

  _GTransition = () => {
    this.context.history.pushState(null, '/gallery');
  }

  _openDialog = () => {
      console.log(this.refs.nav);
      this.refs.nav.handleDialogOpen;
    }

   getStyles() {
    let darkWhite = Colors.darkWhite;
    return {
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: Colors.lightWhite,
        maxWidth: 335,
      },
      github: {
        position: 'fixed',
        right: Spacing.desktopGutter / 2,
        top: 8,
        zIndex: 5,
        color: 'white',
      },
      iconButton: {
        color: darkWhite,
      },
    };
  }


   _getHomePurpose() {
    let styles = {
      root: {
        backgroundColor: Colors.grey200,
      },
      content: {
        maxWidth: 700,
        padding: 0,
        margin: '0 auto',
        fontWeight: Typography.fontWeightLight,
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
        color: Typography.textDarkBlack,
      },

      a: {
        color: '#ff4081'
      }
    };

    return (
      <FullWidthSection
        style={styles.root}
        useContent={true}
        contentStyle={styles.content}
        contentType="p"
        className="home-purpose">
        Navigate through with our tabs to see the &nbsp;
        <a style = {styles.a} onClick={this._GTransition}>Gallery</a> &nbsp; 
        or make your own pitch by registering.
        You can also see tips and what we are about at the &nbsp;
        <a  style= {styles.a} onClick={this._ATransition}>About</a> tab aswell.
        
      </FullWidthSection>
    );
  }

  _getChatBox() {
     let styles = {
      root: {
        backgroundColor: Colors.lightBlue900,
      },
      content: {
        maxWidth: 700,
        padding: 0,
        margin: '0 auto',
        fontWeight: Typography.fontWeightLight,
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        height: '400px',
        marginBottom: 13,
        letterSpacing: 0,
        color: Typography.textDarkBlack,
      }
  };

  return (
      <FullWidthSection
        style={styles.root}
        useContent={true}
        contentStyle={styles.content}
        contentType="p"
        className="chatboxs">
        Chat at our chatbox HERE!
        [Insert ChatBox Here]


          <MobileTearSheet>
            <List subheader="Today">
              <ListItem
                leftAvatar={<Avatar src={chromecon} />}
                primaryText="Karan Kotwal"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Brendan Lim</span> --
                    I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                  </p>
                }
                secondaryTextLines={2} />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src={chromecon} />}
                primaryText="James Harding"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>to me, Scott, Jennifer</span> --
                    Wish I could come, but I&apos;m out of town this weekend.
                  </p>
                }
                secondaryTextLines={2} />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src={chromecon} />}
                primaryText="Bobbafett"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Grace Ng</span> --
                    Do you have Paris recommendations? Have you ever been?
                  </p>
                }
                secondaryTextLines={2} />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src={chromecon} />}
                primaryText="Willusddddddddddddddddddddddddddd"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Kerem Suer</span> --
                    Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                  </p>
                }
                secondaryTextLines={2} />
              <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src={chromecon} />}
                primaryText="Vader"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Raquel Parrado</span> --
                    We should eat this: grated squash. Corn and tomatillo tacos.
                  </p>
                }
                secondaryTextLines={2} />
                 <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src={chromecon} />}
                primaryText="Vader"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Raquel Parrado</span> --
                    We should eat this: grated squash. Corn and tomatillo tacos.
                  </p>
                }
                secondaryTextLines={2} />
                 <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src={chromecon} />}
                primaryText="Vader"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Raquel Parrado</span> --
                    We should eat this: grated squash. Corn and tomatillo tacos.
                  </p>
                }
                secondaryTextLines={2} />
                 <Divider inset={true} />
              <ListItem
                leftAvatar={<Avatar src={chromecon} />}
                primaryText="Vader"
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Raquel Parrado</span> --
                    We should eat this: grated squash. Corn and tomatillo tacos.
                  </p>
                }
                secondaryTextLines={2} />
            </List>
          </MobileTearSheet>        
      </FullWidthSection>
    );
  }


  render() {
    let style = {
      root: {
        backgroundColor: '#2F2F2F',
        height: '580px',
        zIndex: 0,
        width: '100%',
        marginTop: '-3px',
        color: Colors.darkWhite,
        textAlign: 'center'
      },
       svgLogo: {
        width: 200,
        height: 200,  
        textAlign: 'center',
      }
    };




let dialogStyle = {

  root: {
    width: '100%'
  },

  mainDialog: {
    backgroundColor: "#2F2F2F"
  }

};

    let styles = this.getStyles();

    let renderedResult;

    if(this.state.user.get('authenticated')) {
      renderedResult = (
        <div style={{backgroundColor: "#2F2F2F"}}>
        <Paper zDepth={1}
             rounded={false}
             style={style.root}
        >
        <img style={style.svgLogo} src={chromecon}></img>
        <h1>20,000 Pitches</h1>
        <h1>Get started right away by creating your own pitch!</h1>

        <RaisedButton
          label="Create Pitch"
          primary={true}
          linkButton={false}
          onTouchTap={this._createPitch}
          />

        </Paper>


        {this._getHomePurpose()}
        {this._getChatBox()}
        <FullWidthSection style={styles.footer}>
          <p style={styles.p}>
            Programmed and Developed by Karan Kotwal based of Material Design(Material-UI)
            <br/>
            <a style={styles.a} href="http://kkotwal.me">Karan Kotwal</a> 
          </p>
          
        </FullWidthSection>
        
        </div>
        );
    }

    else {
      renderedResult = (
        <div style={{backgroundColor: "#2F2F2F"}}>
        <Paper zDepth={1}
             rounded={false}
             style={style.root}
        >
        <img style={style.svgLogo} src={chromecon}></img>
        <h2>20,000 Pitches</h2>
        <h2>Have a idea boiling in your head?</h2>
        <h2>Do you want to tell someone else about it?</h2>
        <h2>Then register and give your own pitch by uploading a 30 second video describing your idea!</h2>

        <RaisedButton
          label="Register"
          primary={true}
          linkButton={false}
          onTouchTap={this.handleDialogOpen}
          />

        </Paper>


        {this._getHomePurpose()}
        {this._getChatBox()}
        <FullWidthSection style={styles.footer}>
          <p style={styles.p}>
            Programmed and Developed by Karan Kotwal based of Material Design(Material-UI)
            <br/>
            <a style={styles.a} href="http://kkotwal.me">Karan Kotwal</a> 
          </p>
          
        </FullWidthSection>
        
        </div>
        );
    }

    return (
        <div style={{backgroundColor: "#2F2F2F"}}>
        {renderedResult}
        <Dialog
          
          
          bodyStyle={dialogStyle.mainDialog}
          contentStyle={dialogStyle.root}
          modal={false}
          onRequestClose={this.handleDialogClose}
          open={this.state.open}>
          <LoginSignupPage />
        </Dialog>
        </div>
    );
  }

}

Dashboard.contextTypes = { history: PropTypes.history };
Dashboard.propTypes = { UserStore: React.PropTypes.object };