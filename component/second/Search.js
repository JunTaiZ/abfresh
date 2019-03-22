import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'

export default class Search extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'A Nested Details Screen'),
			gesturesEnabled: true,
    };
  };
  render() {
    return (
      <View>
        <Text>hi Search</Text>
      </View>
    )
  }
}