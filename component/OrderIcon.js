import React, {Component} from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

export default class FreshIcon extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.container}
      >
        <Image style={styles.image} source={{uri:this.props.url}} />
        <Text style={styles.name}>{this.props.name}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 25,
    width: 25,
  },
  container: {
    height: 50,
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    marginTop: 5,
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
})