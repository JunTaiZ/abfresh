import React, { Component } from 'react'

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Index extends Component {
  render() {
    let { height, text } = this.props
    return (
      <View style={[{ height }, styles.view]}>
        <Text style={styles.text}>{ text }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#bbb'
  }
})