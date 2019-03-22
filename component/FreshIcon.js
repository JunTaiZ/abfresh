import React, {Component} from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native'

export default class FreshIcon extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <View key={this.props.id} style={styles.container}>
        <Image style={styles.image} source={{uri:this.props.url}} />
        <Text style={styles.name}>{this.props.name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  container: {
  },
  name: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
})