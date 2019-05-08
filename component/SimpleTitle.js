import React, { Component } from 'react'


import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

// <StatusBar backgroundColor={'rgb(237, 56, 16)'}/>
export default class Index extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 25,
    paddingLeft: 15,
    paddingTop: 4,
    paddingBottom: 3,
  },
  text: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  }
})