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
  View,
  Dimensions,
  TextInput,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import Home from './Home';
import Signup from './Signup';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fill : 50,
      barWidth: 200,
      errorMessage: '',
      email: '',
      password: '',
    }
  }
  login() {
    var firebase = this.props.firebase;
    var email = this.state.email;
    var password = this.state.password;
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
      AsyncStorage.setItem('snapdiet', JSON.stringify(result));
      this.props.navigator.replace({
        title: 'SnapDiet',
        component: Home,
        passProps: {firebase : firebase, uid: result.uid},
        rightButtonTitle: 'Logout',
        onRightButtonPress: () => this.props.handleLogout(),
      });
    }.bind(this)).catch(function(error) {
      // Handle Errors here.
      this.setState({ errorMessage : error.message });
    }.bind(this));
  }
  onEmailChange(event) {
    this.setState({email: event.nativeEvent.text});
  }
  onPasswordChange(event) {
    this.setState({password: event.nativeEvent.text});
  }
  signIn() {
    this.props.navigator.push({
      title: 'Sign up',
      component: Signup,
      passProps: {firebase: this.props.firebase, handleLogout: this.props.handleLogout}
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flow}>
          <TextInput 
            autoCapitalize="none" 
            keyboardType="email-address" 
            style={styles.input} 
            placeholder="Email"
            value={this.state.email}
            onChange={this.onEmailChange.bind(this)}
            />
          <TextInput 
            autoCapitalize="none" 
            secureTextEntry={true} 
            style={styles.input} 
            placeholder="Password"
            value={this.state.password}
            onChange={this.onPasswordChange.bind(this)}
            />
          <TouchableHighlight style={styles.button} onPress={this.login.bind(this)}>
            <Text style={styles.buttonText}>
              Sign in!
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this.signIn.bind(this)}>
            <Text style={styles.buttonText}>
              No account yet? Sign up!
            </Text>
          </TouchableHighlight>
          <Text style={styles.error}>{this.state.errorMessage}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 65,
    flex: 1,
    backgroundColor: '#47d147',
    justifyContent: 'center',
  },
  input: {
    height: 36,
    padding: 10,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white',
  },
  button: {
    height: 36,
    flexDirection: 'row',
    backgroundColor: '#00e0ff',
    borderColor: '#00e0ff',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  error: {
    fontSize: 25,
    color: 'red',
    alignSelf: 'center'
  },
});

