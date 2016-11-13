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
  AsyncStorage,
  Slider,
  SegmentedControlIOS,
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
      weight: 0,
      height: 0,
      excercise: 1.2,
      gender: 0,
      age: 0,
      goal : 0,
    }
  }
  signup(){
    console.log(this.props);
    var firebase = this.props.firebase;
    if (!this.state.email || !this.state.password ||
        !this.state.username || this.state.weight === 0 ||
        this.state.height === 0 || this.state.age === 0) {
      this.setState({errorMessage : "Make sure to fill out all fields"});
      return;
    }
    this.setState({
      loaded: false
    });
    var email = this.state.email;
    var password = this.state.password;
    // Creates new user.
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result) {
      result.updateProfile({
        displayName: this.state.username
      }).then(function() {
        console.log(this);
        AsyncStorage.setItem('snapdiet', JSON.stringify(result));
        this.props.navigator.replace({
          title: 'SnapDiet',
          component: Home,
          passProps: {firebase : firebase, uid : result.uid},
          rightButtonTitle: 'Logout',
          onRightButtonPress: () => this.props.handleLogout(),
        });
      }.bind(this)).then(function() {
        var updates = {};
        var bmr;
        if (this.state.gender) {
          bmr = 66.47 + (13.75 * this.state.weight) + (5.0 * this.state.height) - (6.75 * this.state.age);
        } else {
          bmr = 665.09 + (9.56 * this.state.weight) + (1.84 * this.state.height) - (4.67 * this.state.age);
        }
        var goal = (this.state.goal ? 500 : -500) + (bmr * this.state.excercise);
        updates['users/' + result.uid + '/name'] = this.state.username;
        updates['users/' + result.uid + '/age'] = this.state.age;
        updates['users/' + result.uid + '/gender'] = this.state.gender ? "Female" : "Male";
        updates['users/' + result.uid + '/height'] = this.state.height;
        updates['users/' + result.uid + '/weight'] = this.state.weight;
        updates['users/' + result.uid + '/excercise'] = this.state.excercise;
        updates['users/' + result.uid + '/email'] = this.state.email;
        updates['users/' + result.uid + '/bmr'] = bmr;
        updates['users/' + result.uid + '/goal'] = goal;
        updates['users/' + result.uid + '/lastDay'] = 0;
        updates['users/' + result.uid + '/totalToday'] = 0;
        // Updates image likes and notifications for artist and image.
        firebase.database().ref().update(updates);
      }.bind(this)).catch(function(error) {
          console.log(error);
      }.bind(this));
    }.bind(this)).catch(function(error) {
      this.setState({ errorMessage : error.message });
    }.bind(this));
  }
  onUsernameChange(event) {
    this.setState({username: event.nativeEvent.text});
  }
  onEmailChange(event) {
    this.setState({email: event.nativeEvent.text});
  }
  onPasswordChange(event) {
    this.setState({password: event.nativeEvent.text});
  }
  onHeightChange(event) {
    this.setState({height: event.nativeEvent.text});
  }
  onWeightChange(event) {
    this.setState({weight: event.nativeEvent.text});
  }
  onExcerciseChange(num) {
    var val = 1.2 + (num * 5 * .175);
    this.setState({excercise: val});
  }
  onGenderChange(event) {
    this.setState({gender : event.nativeEvent.selectedSegmentIndex});
  }
  onAgeChange(event) {
    this.setState({age : event.nativeEvent.text});
  }
  onGoalChange(event) {
    this.setState({age : event.nativeEvent.text});
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flow}>
          <TextInput 
            autoCapitalize="none" 
            style={styles.input} 
            placeholder="Username"
            onChange={this.onUsernameChange.bind(this)}
          />
          <TextInput 
            autoCapitalize="none" 
            style={styles.input} 
            placeholder="Age"
            keyboardType="numeric"
            onChange={this.onAgeChange.bind(this)}
          />
          <SegmentedControlIOS
            tintColor="#ff0000"
            values={['Male', 'Female']}
            selectedIndex={this.state.gender}
            onChange={this.onGenderChange.bind(this)}
          />
          <TextInput 
            autoCapitalize="none" 
            style={styles.input} 
            keyboardType="numeric"
            placeholder="Weight in lbs."
            onChange={this.onWeightChange.bind(this)}
          />
          <TextInput 
            autoCapitalize="none" 
            style={styles.input} 
            placeholder="Height in cm."
            keyboardType="numeric"
            onChange={this.onHeightChange.bind(this)}
            />
          <Text>Excercise Level</Text>
          <Slider minimum={1.2} maximum={1.9} step={0.2} onSlidingComplete={this.onExcerciseChange.bind(this)}/>
          <SegmentedControlIOS
            tintColor="#00ff00"
            values={['Lose weight', 'Gain weight']}
            selectedIndex={this.state.goal}
            onChange={this.onGoalChange.bind(this)}
          />
          <TextInput 
            autoCapitalize="none" 
            value={this.state.email} 
            keyboardType="email-address" 
            style={styles.input} 
            placeholder="Email"
            onChange={this.onEmailChange.bind(this)}
            />
          <TextInput 
            autoCapitalize="none" 
            value={this.state.password} 
            secureTextEntry={true} 
            style={styles.input} 
            placeholder="Password"
            onChange={this.onPasswordChange.bind(this)}
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

