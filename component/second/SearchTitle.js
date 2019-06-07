import React, { Component } from 'react'
import { IP } from '../serverConfig.json'
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native'
const ip = IP
export default class SearchTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      freshItems: [],
    }
  }
  changeText(text) {
    this.setState({
      text,
    })
    fetch(`${ip}/search?name=${text}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((responseJson) => {
      this.props.navigation.setParams({
        freshItems: responseJson
      })
    })
  }
  render() {
    return (
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.changeText(text)}
          value={this.state.text}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 30,
    width: 270,
    borderRadius: 5,
    paddingLeft: 5,
    backgroundColor: '#f3f3f3',
    padding: 0
  }
})