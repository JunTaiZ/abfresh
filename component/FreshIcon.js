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
        activeOpacity={0.8}
        style={styles.container}
        onPress={() => {
          this.props.this.setState({
            selectedTab: 'Classify',
            classify: this.props.id,
          })
        }}
      >
        <Image style={styles.image} source={{uri:this.props.url}} />
        <Text style={styles.name}>{this.props.name}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 45,
    width: 45,
    borderRadius: 10,
  },
  container: {
    height: 50,
    width: 60,
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    marginTop: 5,
    fontSize: 11,
    color: '#888',
    textAlign: 'center',
  },
})