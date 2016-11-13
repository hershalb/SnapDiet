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

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fill : 50,
      barWidth: 200,
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flow}>
          <TextInput autoCapitalize="none" keyboardType="email-address" style={styles.input} placeholder="Username"/>
          <TextInput autoCapitalize="none" secureTextEntry={true} style={styles.input} placeholder="Password"/>
          <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>
              Sign in!
            </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button}>
            <Text style={styles.buttonText}>
              No account yet? Sign up!
            </Text>
          </TouchableHighlight>
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
});

