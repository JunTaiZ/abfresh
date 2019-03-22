import React, { Component } from 'react'
import FreshIcons from './FreshIcon'
import { createStackNavigator, createAppContainer } from 'react-navigation'
// import Search from './second/Search'

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  TouchableHighlight,
} from 'react-native';
let ip = 'http://192.168.1.113:3000'
const freshIcons = [{
  url: `${ip}/images/fruit.jpg`,
  name: '新鲜水果',
  id: 'fruit',
}, {
  url: `${ip}/images/tomato.jpg`,
  name: '生吃蔬菜',
  id: 'vege',
}, {
  url: `${ip}/images/qingxie.jpg`,
  name: '鲜活水产',
}, {
  url: `${ip}/images/niurou.jpg`,
  name: '瘦肥肉肉',
  id: 'meat',
},]

// <StatusBar backgroundColor={'rgb(237, 56, 16)'}/>
export default class Home extends Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          {freshIcons.map((image) => {
            return(
              <FreshIcons id={image.id} url={image.url} name={image.name} />
            )
          })}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: Home
//   },
//   Search: {
//     screen: Search
//   }
// }, {
//   initialRouteName: 'Home'
// });
// const AppContainer = createAppContainer(AppNavigator)

// export default AppContainer