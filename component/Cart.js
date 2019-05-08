import React, { Component } from 'react'
import Title from './SimpleTitle'


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
        <Title
          name={'购物车'}
        />
        <ScrollView>
          <Text>hi</Text>
        </ScrollView>
        <View style={styles.bottom}>
          <Text>bottom</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleHeader: {
    height: 25,
    paddingLeft: 15,
    paddingTop: 4,
    paddingBottom: 3,
  },
  text: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',

  },
  scrollView: {
    flex: 1
  },
  bottom: {
  }
})