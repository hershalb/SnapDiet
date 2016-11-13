/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  View
} from 'react-native';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCJO-tai7-CbFKIC0t2J5md0bcbTQqWw6Y",
  authDomain: "snapdiet-4fa65.firebaseapp.com",
  databaseURL: "https://snapdiet-4fa65.firebaseio.com",
  storageBucket: "snapdiet-4fa65.appspot.com",
  messagingSenderId: "316060951653"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class SnapDiet extends Component {
  render() {
    return (
      <NavigatorIOS 
        style={styles.container}
        initialRoute={{
          title: 'Signup',
          component: Signup,
          passProps: {firebase : firebaseApp}
      }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#47d147',
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

AppRegistry.registerComponent('SnapDiet', () => SnapDiet);
