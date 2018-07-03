/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CircleSlider from './CircleSlider'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
      <View style={{flex: 2}} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CircleSlider
          value={90}
          textColor={"white"}
          xCenter={50}
          yCenter={50}
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 50,
    color: 'white'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
