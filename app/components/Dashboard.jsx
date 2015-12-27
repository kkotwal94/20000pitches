import React from 'react';
import Link from 'react-router';
import FullWidthSection from 'components/FullWidthSection';
const { AppBar,
      AppCanvas,
      FontIcon,
      IconButton,
      EnhancedButton,
      Menu,
      Mixins,
      RaisedButton,
      Styles,
      Tab,
      Tabs,
      Paper} = require('material-ui');

const { StylePropable } = Mixins;
const { Colors, Spacing, Typography } = Styles;
import {PropTypes} from 'react-router';
import chromecon from 'images/chrome.png';
export default class Dashboard extends React.Component {

  

  constructor(props) {
  	super(props);
	//const muiTheme = ThemeManager.getMuiTheme(DefaultRawTheme);
  	//this.state = {muiTheme: ThemeManager.getMuiTheme(DefaultRawTheme)};
  }

 static contextTypes = {
        router: React.PropTypes.func
    }

  componentWillMount() {
  	/*(let newMuiTheme = this.state.muiTheme;
  	this.setState({
      muiTheme: newMuiTheme
  });*/
  }
  
  componentWillReceiveProps(nextProps, nextContext) {

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
        className="chatbox">
        Chat at our chatbox HERE!
        [Insert ChatBox Here]
        
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


    let styles = this.getStyles();

    return (
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
          onTouchTap={this._openDialog}
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

}

Dashboard.contextTypes = { history: PropTypes.history };
Dashboard.propTypes = { UserStore: React.PropTypes.object };