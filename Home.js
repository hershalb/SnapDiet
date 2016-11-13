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

import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fill : 50,
      barWidth: 200,
    }
  }
  componentWillMount() {
    this.setState({barWidth: (Dimensions.get('window').width - 100) });
  }
  render() {
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
                    { 1000 }
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
        <TouchableHighlight style={{right: 0}}>
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

