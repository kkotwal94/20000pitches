import React from 'react';
import styles from 'scss/components/_dashboard';
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


export default class Dashboard extends React.Component {

  

  constructor(props) {
  	super(props);
	//const muiTheme = ThemeManager.getMuiTheme(DefaultRawTheme);
  	//this.state = {muiTheme: ThemeManager.getMuiTheme(DefaultRawTheme)};
  }


  componentWillMount() {
  	/*(let newMuiTheme = this.state.muiTheme;
  	this.setState({
      muiTheme: newMuiTheme
  });*/
  }
  
  componentWillReceiveProps(nextProps, nextContext) {

  }

  render() {
    let styles = {
      root: {
        backgroundColor: '#2F2F2F',
        height: '580px',
        zIndex: 0,
        width: '100%',
        marginTop: '-3px'
      }
    };
    return (
        <div>
        <Paper zDepth={1}
             rounded={false}
             style={styles.root}
        >
        <p>Stuff</p>
        </Paper>
        
        </div>
    );
  }

}

