import React, {Component} from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
 
export default class Detail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title','Title'),
      gesturesEnabled: true,
    };
  };
  render() {
    return (
      <View>
        <StatusBar
          translucent={false}
          backgroundColor={'white'}
          barStyle={'dark-content'}
        />
        <Text>detail</Text>
      </View>
    )
  }
}