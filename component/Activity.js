import React, { Component } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'

export default class Activity extends Component {
  render() {
    let {activity} = this.props
    return(
      <View style={styles.container}>
        <ActivityIndicator
          style={{display: activity ? 'none' : 'flex'}}
          size='large' color="gray" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 20,
    marginLeft: -12,
    marginTop: -10,
  }
})