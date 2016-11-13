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
  TouchableHighlight
} from 'react-native';

import Home from './Home';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fill : 50,
      barWidth: 200,
      loaded: true,
      email: '',
      password: '',
      username: '',
      errorMessage: '',
    }
  }
  signup(){
    var firebase = this.props.firebase;
    this.setState({
      loaded: false
    });
    var email = this.state.email;
    var password = this.state.password;
    // Creates new user.
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
      result.updateProfile({
        username: this.state.username
      }).then(function() {
        this.props.navigator.push({
          title: 'Post',
          component: Home
        });
      }.bind(this)).catch(function(error) {
        this.setState({ errorMessage : error.message });
      });
    }.bind(this)).catch(function(error) {
      this.setState({ errorMessage : error.message });
    }.bind(this));
  }
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <View style={styles.flow}>
          <TextInput 
            autoCapitalize="none" 
            style={styles.input} 
            placeholder="Username"
            onChange={(event) => this.setState({username: event.nativeEvent.text})}
            />
          <TextInput autoCapitalize="none" style={styles.input} placeholder="Weight"/>
          <TextInput autoCapitalize="none" style={styles.input} placeholder="Height"/>
          <TextInput autoCapitalize="none" style={styles.input} placeholder="Excerise"/>
          <TextInput 
            autoCapitalize="none" 
            value={this.state.email} 
            keyboardType="email-address" 
            style={styles.input} 
            placeholder="Email"
            onChange={(event) => this.setState({email: event.nativeEvent.text})}
            />
          <TextInput 
            autoCapitalize="none" 
            value={this.state.password} 
            secureTextEntry={true} 
            style={styles.input} 
            placeholder="Password"
            onChange={(event) => this.setState({password: event.nativeEvent.text})}
            />
          <TouchableHighlight onPress={this.signup.bind(this)} style={styles.button}>
            <Text style={styles.buttonText}>
              Sign in!
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

