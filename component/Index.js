import React, { Component } from 'react'
import FreshIcons from './FreshIcon'
import IndexList from './IndexList'
import Cut from './Cut'
import { IP } from './serverConfig.json'

import { createStackNavigator, createAppContainer } from 'react-navigation'
// import Search from './second/Search'
import ScrollableTabView, {
  DefaultTabBar, ScrollableTabBar 
} from 'react-native-scrollable-tab-view'


let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let ip = IP
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
const freshIcons = [{
  url: `${ip}/images/fruit.jpg`,
  name: '新鲜水果',
  id: 'fruit',
}, {
  url: `${ip}/images/tomato2.png`,
  name: '生吃蔬菜',
  id: 'vege',
}, {
  url: `${ip}/images/qingxie2.png`,
  name: '鲜活水产',
  id: 'seafood',
}, {
  url: `${ip}/images/niurou.jpg`,
  name: '瘦肥肉肉',
  id: 'meat',
},]

let hotSell = [{
  classify: 'fruit',
  url: `${ip}/images/apple.jpg`,
  name: '苹果200g',
  vip: false,
  limitTime: true,
  cost: 15.00,
  cheap: 14.30,
  selled: 2000,
}, {
  classify: 'fruit',
  url: `${ip}/images/banana.jpg`,
  name: '香蕉200g',
  vip: false,
  limitTime: true,
  cost: 12.00,
  cheap: 9.00,
  selled: 502,
}, {
  classify: 'seafood',
  url: `${ip}/images/yaoxie.jpg`,
  name: '药蟹500g',
  vip: false,
  limitTime: false,
  cost: 35.00,
  cheap: 35.00,
  selled: 116,
}, {
  classify: 'meat',
  url: `${ip}/images/zhurou2.jpg`,
  name: '猪肉300g',
  vip: true,
  limitTime: false,
  cost: 23.00,
  cheap: 22.00,
  selled: 231,
}, {
  classify: 'vege',
  url: `${ip}/images/tomato.jpg`,
  name: '番茄200g',
  vip: false,
  limitTime: true,
  cost: 15.00,
  cheap: 13.00,
  selled: 601,
}, {
  classify: 'fish',
  url: `${ip}/images/qiudaoyu.jpg`,
  name: '秋刀鱼300g',
  vip: false,
  limitTime: false,
  cost: 25.00,
  cheap: 25.00,
  selled: 200,
}, {
  classify: 'seafood',
  url: `${ip}/images/balangyu.jpg`,
  name: '巴浪鱼250g',
  vip: false,
  limitTime: true,
  cost: 15.00,
  cheap: 14.30,
  selled: 2020,
}, {
  classify: 'seefood',
  url: `${ip}/images/zhangyu.jpg`,
  name: '章鱼250g',
  vip: true,
  limitTime: false,
  cost: 19.00,
  cheap: 15.00,
  selled: 522,
}, {
  classify: 'seefood',
  url: `${ip}/images/yaoxie.jpg`,
  name: '药蟹500g',
  vip: false,
  limitTime: false,
  cost: 35.00,
  cheap: 35.00,
  selled: 116,
}, {
  classify: 'meat',
  url: `${ip}/images/zhurou2.jpg`,
  name: '猪肉300g',
  vip: true,
  limitTime: false,
  cost: 23.00,
  cheap: 22.00,
  selled: 231,
}, {
  classify: 'vege',
  url: `${ip}/images/tomato.jpg`,
  name: '番茄200g',
  vip: false,
  limitTime: true,
  cost: 15.00,
  cheap: 13.00,
  selled: 601,
}, {
  classify: 'fish',
  url: `${ip}/images/qiudaoyu.jpg`,
  name: '秋刀鱼300g',
  vip: false,
  limitTime: false,
  cost: 25.00,
  cheap: 25.00,
  selled: 200,
}, ]
item = {
  classify: '',
  url: ``,
  name: '',
  vip: false,
  limitTime: false,
  cost: 0,
  cheap: 0,
  selled: 0,
}


// <StatusBar backgroundColor={'rgb(237, 56, 16)'}/>
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.getHotsell = this.getHotsell.bind(this)
    this.getVip = this.getVip.bind(this)
    this.getEven = this.getEven.bind(this)
    this.getLimitTime = this.getLimitTime.bind(this)
  }
  getHotsell() {
    return this.getEven(hotSell)
  }
  getEven(array) {
    if (array.length % 2 === 1) {
      array.push(item)
    }
    return array
  }
  getVip(e) {
    let hotSell = this.getHotsell()
    let vip = hotSell.filter((item) => {
      return item.vip
    })
    return this.getEven(vip)
  }
  getLimitTime() {
    let hotSell = this.getHotsell()
    let limitTime = hotSell.filter((item) => {
      return item.limitTime
    })
    return this.getEven(limitTime)
  }
  render() {
    return (
      <View style={styles.index}>
        <ScrollableTabView
          style={styles.scrollTabView}
          renderTabBar={ () => <ScrollableTabBar /> }
          tabBarUnderlineStyle={styles.lineStyle}
          tabBarActiveTextColor='black'
          tabBarInactiveTextColor='gray'
          tabBarBackgroundColor='white'
          tabBarTextStyle={styles.textStyle}
        >
          <ScrollView style={styles.container} tabLabel="热卖">
            <View style={styles.icons}>
              {freshIcons.map((image) => {
                return(
                  <FreshIcons
                    key={image.url}
                    id={image.id}
                    this={this.props.this}
                    url={image.url} name={image.name} 
                  />
                )
              })}
            </View>
            <IndexList 
              navigation={this.props.navigation}
              hotSell={this.getHotsell()}
            />
            <Cut text={'已触碰到我的底线～'} height={45} />
          </ScrollView>
          <ScrollView style={styles.container} tabLabel="会员特价">
            <IndexList 
              navigation={this.props.navigation}
              hotSell={this.getVip()}
            />
            <Cut text={'已触碰到我的底线～'} height={45} />
          </ScrollView>
          <ScrollView style={styles.container} tabLabel="限时抢购">
            <IndexList 
              navigation={this.props.navigation}
              hotSell={this.getLimitTime()}
            />
            <Cut text={'已触碰到我的底线～'} height={45} />
          </ScrollView>
        </ScrollableTabView>
      </View>
    )
  }
}
let screenWidth = this.screenWidth
const styles = StyleSheet.create({
  index: {
    flex: 1,
  },
  container: {
    // backgroundColor: 'rgb(237, 56, 16)',
    backgroundColor: '#f8f8f8',
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-around',
    backgroundColor: 'white',
    
  },
  scrollTabView: {
    flex: 1,
    
  },
  lineStyle: {
    height: 2,
    backgroundColor: 'rgb(237, 54, 16)'
  },
  textStyle: {
    fontSize: 15,
  },
  hotSell: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
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