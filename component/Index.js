import React, { Component } from 'react'
import FreshIcons from './FreshIcon'
import IndexList from './IndexList'
import Cut from './Cut'
import { IP } from './serverConfig.json'
import Pull from './Pull'

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
  name: '水果',
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
    this.renderVip = this.renderVip.bind(this)
    this.renderHotSell = this.renderHotSell.bind(this)
    this.renderLimitTime = this.renderLimitTime.bind(this)
    this.state = {
      limitTime: [{}],
      vip: [{}],
      hotSell: [{}],
    }
  }
  componentDidMount() {
    this.getHotsell()
    this.getVip()
    this.getLimitTime()
  }
  getHotsell(e) {
    fetch(`${ip}/search?selled=500`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((responseJson) => {
      let hotSell = responseJson
      this.props.appThis.setState({
        hotSell: this.getEven(hotSell)
      })
      e()
		}).catch((err) => {
      alert('网络错误')
      console.log(err)
    })
  }
  getEven(array) {
    if (array.length % 2 === 1) {
      array.push(item)
    }
    return array
  }
  getVip(e) {
    fetch(`${ip}/search?vip=1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((responseJson) => {
      let vip = responseJson
      this.props.appThis.setState({
        vip: this.getEven(vip)
      })
      e()
		}).catch((err) => {
      alert('网络错误')
      console.log(err)
    })
  }
  getLimitTime(e) {
    fetch(`${ip}/search?limittime=1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((responseJson) => {
      let limitTime = responseJson
      this.props.appThis.setState({
        limitTime: this.getEven(limitTime)
      })
      e()
		}).catch((err) => {
      alert('网络错误')
      console.log(err)
    })
  }
  renderVip() {
    return(
      <View>
        <IndexList 
          navigation={this.props.navigation}
          hotSell={this.props.appThis.state.vip}
        />
        <Cut text={'已触碰到我的底线～'} height={45} />
      </View>
    )
  }
  renderLimitTime() {
    return(
      <View>
        <IndexList 
          navigation={this.props.navigation}
          hotSell={this.props.appThis.state.limitTime}
        />
        <Cut text={'已触碰到我的底线～'} height={45} />
      </View>
    )
  }
  renderHotSell() {
    return(
      <View>
        <View style={styles.icons}>
          {freshIcons.map((image) => {
            return(
              <FreshIcons
                key={image.url}
                id={image.id}
                this={this.props.appThis}
                url={image.url} name={image.name} 
              />
            )
          })}
        </View>
        <IndexList 
          navigation={this.props.navigation}
          hotSell={this.props.appThis.state.hotSell}
        />
        <Cut text={'已触碰到我的底线～'} height={45} />
      </View>
    )
  }
  render() {
    let {appThis} = this.props
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
            <Pull
              renderData={this.renderHotSell}
              onPullRelease={this.getHotsell}
              height={appThis.state.hotSell.length * 150}
            />
          </ScrollView>
          <ScrollView style={styles.container} tabLabel="会员特价">
            <Pull 
              height={appThis.state.vip.length * 150}
              renderData={this.renderVip}
              onPullRelease={this.getVip}
            />
          </ScrollView>
          <ScrollView style={styles.container} tabLabel="限时抢购">
            <Pull
              height={appThis.state.limitTime.length * 150}
              renderData={this.renderLimitTime}
              onPullRelease={this.getLimitTime}
            />
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