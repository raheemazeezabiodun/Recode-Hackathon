import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Tts from 'react-native-tts';
import axios from 'axios';
import SplashPage from './js/components/splash';
import AccessVoice from './App';


export default class voiceit extends Component {
  componentDidMount() {
    Tts.speak('welcome on board');
    Tts.speak('second time');
    
  }
  render() {
    return (
      <AccessVoice />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('voiceit', () => voiceit);
