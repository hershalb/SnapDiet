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
  TouchableHighlight
} from 'react-native';

import Example from './CameraRoll';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fill : 0,
      barWidth: 200,
      goal: 0,
      soFar: 0,
    }
  }
  componentWillMount() {
    var firebase = this.props.firebase;
    this.setState({barWidth: (Dimensions.get('window').width - 100), uid : this.props.uid });
    firebase.database().ref('users/' + this.props.uid).on('value', function(snapshot) {
      // Gets all user information. Should split into different functions.
      if (snapshot.val()) {
        console.log(snapshot.val());
        if (snapshot.val().lastDay && snapshot.val().totalToday) {
          var dateToCheck = new Date(snapshot.val().lastDay);
          var actualDate = new Date(Date.now());
          var isSameDay = (dateToCheck.getDate() == actualDate.getDate() 
          && dateToCheck.getMonth() == actualDate.getMonth()
          && dateToCheck.getFullYear() == actualDate.getFullYear())
          if (isSameDay) {
            this.setState({ soFar : snapshot.val().totalToday });
          }
        } else {
          this.setState({ soFar : 0 });
        }
        if (snapshot.val().goal) {
          this.setState({ goal : snapshot.val().goal });
        } else {
          this.setState({ goal : 0 });
        }
      } else {
        this.setState({ goal : 0 });
        this.setState({ soFar : 0 });
      }
      this.setState({ fill : Math.round(this.state.soFar / this.state.goal) });
    }.bind(this));
  }
  goToCamera() {
    this.props.navigator.push({
      title: 'Camera Roll',
      component: Example,
      passProps: {firebase: this.props.firebase, handleLogout: this.props.handleLogout}
    });
  }
  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <View style={styles.circular}>
          <AnimatedCircularProgress
            size={200}
            width={10}
            fill={this.state.fill}
            tintColor="#00e0ff"
            tension={150}
            friction={15}
            backgroundColor="#ededed">
            {
              (fill) => (
                <View style={styles.points}>
                  <Text style={styles.calories}>
                    { Math.round(this.state.soFar) }
                  </Text>
                  <Text style={styles.info}>
                    calories snapped
                  </Text>
                </View>
              )
            }
          </AnimatedCircularProgress>
        </View>
        <View style={styles.bars}>
          <Text style={styles.foodG}>Dairy</Text>
          <Progress.Bar progress={0.3} borderColor="white" color="#00e0ff" style={styles.bar} width={this.state.barWidth} />
          <Text style={styles.foodG}>Fruit</Text>
          <Progress.Bar progress={0.3} borderColor="white" color="#00e0ff" style={styles.bar} width={this.state.barWidth} />
          <Text style={styles.foodG}>Grain</Text>
          <Progress.Bar progress={0.3} borderColor="white" color="#00e0ff" style={styles.bar} width={this.state.barWidth} />
          <Text style={styles.foodG}>Protein</Text>
          <Progress.Bar progress={0.3} borderColor="white" color="#00e0ff" style={styles.bar} width={this.state.barWidth} />
          <Text style={styles.foodG}>Vegetables</Text>
          <Progress.Bar progress={0.3} borderColor="white" color="#00e0ff" style={styles.bar} width={this.state.barWidth} />
        </View>
        <TouchableHighlight style={{right: 0}} onPress={this.goToCamera.bind(this)}>
          <Icon name="plus-circle" size={30} color="black" />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ac773',
  },
  calories: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    fontSize: 45,
    fontWeight: "normal"
  },
  bar : {
    marginBottom: 30,
  },
  foodG : {
    fontSize: 20,
    textAlign: 'left',
    color: 'white',
  },
  bars : {
    flex: 1,
    marginTop: -100,
    alignSelf: 'center',
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  info: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  circular: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 30,
    paddingTop: 50
  },
  points: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 55,
    left: 27,
    width: 150,
  },
});

