import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';

export default class Index extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    //drawerLabel:'页面2'
  };
  render() {
    return (
      <View>
        <Text>hi Mine</Text>
      </View>
    )
  }
}