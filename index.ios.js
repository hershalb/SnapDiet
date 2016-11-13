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
  View,
  AsyncStorage
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
  constructor() {
    super();

    this.state = {
      home : false,
      loaded : false,
      uid: '',
    }

    this.handleLogout = this.handleLogout.bind(this);
  }
  componentWillMount() {
    AsyncStorage.getItem('snapdiet').then((json) => {
      var home = false;
      var uid = '';
      if (json) {
        uid = JSON.parse(json)['uid'];
        home = true;
      }
      this.setState({ loaded : true, home : home, uid : uid });
    });
  }
  handleLogout() {
    this.setState({ loaded : false });
    AsyncStorage.removeItem('snapdiet').then(()=> {
      firebaseApp.auth().signOut().then(function() {
        this.setState({loaded: true, home : false });
      }.bind(this), function(error) {
        this.setState({loaded: true });
        console.log(error);
      }.bind(this));
    });
  }
  render() {
    return (
      this.state.loaded ?
        <NavigatorIOS 
          style={styles.container}
          initialRoute={{
            title: this.state.home ? 'SnapDiet' : 'Login',
            component: this.state.home ? Home : Login,
            passProps: {firebase : firebaseApp, handleLogout: this.handleLogout, uid : this.state.uid},
            rightButtonTitle: this.state.home ? 'Logout' : '',
            onRightButtonPress: () => this.handleLogout(),
        }}/> :
      null
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
