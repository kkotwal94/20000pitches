import React from 'react';
import AltContainer from 'alt-container';
import UserStore from 'stores/UserStore';
import Navigation from 'components/Navigation';
import 'scss/main';
import injectTapEventPlugin from 'react-tap-event-plugin';
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const ThemeDecorator = require('material-ui/lib/styles/theme-decorator');
import { PropTypes } from 'react-router';
const { Styles } = require('material-ui');
const DarkRawTheme = Styles.DarkRawTheme;
const DefaultRawTheme = Styles.LightRawTheme;

//window.React = React;
injectTapEventPlugin();
/*
 * This component operates as a "Controller-View". It listens for changes in the
 * Store and passes the new data to its children.
 *
 * React provides the kind of composable views we need for the view layer. Close to the top of the nested view hierarchy,
 * a special kind of view listens for events that are broadcast by the stores that it depends on. One could call this a
 * controller-view, as it provides the glue code to get the data from the stores and to pass this data down the chain of its
 * descendants. We might have one of these controller views governing any significant section of the page.
 *
 * When it receives an event from the store, it first requires the new data via the store's public getter methods. It then calls
 * its own setState() or forceUpdate() methods, causing its own render() method and the render() method of all its descendants to run.
 *
 * We often pass the entire state of the store down the chain of views in a single object, allowing different descendants to use
 * what they need. In addition to keeping the controller-like behavior at the top of the hierarchy, and thus keeping our descendant
 */

@ThemeDecorator(ThemeManager.getMuiTheme(DefaultRawTheme))
export default class App extends React.Component {
  render() {
    return (
      <AltContainer stores={{
        UserStore: UserStore
      }}>
        <Navigation />
        {this.props.children}
      </AltContainer>
    );
  }
}

App.propTypes = { children: React.PropTypes.object};
App.contextTypes = { history: PropTypes.history };