import React, { Component } from 'react'
import Cut from '../Cut'
import { IP } from '../serverConfig.json'
import Pull from '../Pull'
import Activity from '../Activity'
import OrderItem from './OrderItem'

// import Search from './second/Search'
import ScrollableTabView, {
  DefaultTabBar, ScrollableTabBar 
} from 'react-native-scrollable-tab-view'

let ip = IP
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  AsyncStorage,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

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
    this.getOrder = this.getOrder.bind(this)
    this.renderOrder = this.renderOrder.bind(this)
    this.state = {
      orders: [{}],
      activity: false,
      telephone: '',
    }
    this.getOrder()
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <View style={styles.title}>
        <Text style={styles.titleName}>我的订单</Text>
      </View>,
      gesturesEnabled: true,
    };
  };
  componentDidMount() {
    
  }
  initTelephone() {
    
  }
  getOrder(e) {
    AsyncStorage.getItem('user').then((res) => {
      res = JSON.parse(res)
      let telephone = res.telephone
      if (telephone !== '') {
        this.setState({
          telephone
        })
        fetch(`${ip}/searchOrder?telephone=${telephone}`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Content-Type": 'application/json',
          },
        }).then((response) => response.json()).then((responseJson) => {
          this.setState({
            orders: responseJson
          })
          if (this.state.activity) {
            e()
          } else {
            this.setState({
              activity: true
            })
          }
        }).catch((err) => {
          alert('获取订单错误')
          console.log(err)
        })
      }
      
    })
    
  }
  renderOrder() {
    return(
      <View>
        {
          this.state.orders.map((value, index) => {
            return (
              <OrderItem
                key={value.url + index}
                item={value}
                telephone={this.state.telephone}
              />
            )
          })
        }
        <Cut text={'已触碰到我的底线～'} height={85} />
      </View>
    )
  }
  renderLimitTime() {
    if (this.state.activity)
    return(
      <View>
        
      </View>
    )
  }
  renderHotSell() {
    return(
      <View>
        
        <Cut text={'已触碰到我的底线～'} height={45} />
      </View>
    )
  }
  render() {
    return (
      <View style={styles.index}>
        <StatusBar
          translucent={false}
          backgroundColor={'white'}
          barStyle={'dark-content'}
        />
        <Activity activity={this.state.activity} />
        <ScrollableTabView
          style={styles.scrollTabView}
          renderTabBar={ () => <ScrollableTabBar /> }
          tabBarUnderlineStyle={styles.lineStyle}
          tabBarActiveTextColor='black'
          tabBarInactiveTextColor='gray'
          tabBarBackgroundColor='white'
          tabBarTextStyle={styles.textStyle}
        >
          <ScrollView style={styles.container} tabLabel="全部订单">
            <Pull
              height={this.state.orders.length * 200}
              renderData={this.renderOrder}
              onPullRelease={this.getOrder}
            />
          </ScrollView>
          <ScrollView style={styles.container} tabLabel="待付款">
            <Pull 
              renderData={this.renderVip}
              onPullRelease={this.getVip}
            />
          </ScrollView>
          <ScrollView style={styles.container} tabLabel="待收货">
            <Pull
              renderData={this.renderLimitTime}
              onPullRelease={this.getLimitTime}
            />
          </ScrollView>
          <ScrollView style={styles.container} tabLabel="待评价">
            <Pull
              renderData={this.renderLimitTime}
              onPullRelease={this.getLimitTime}
            />
          </ScrollView>
          <ScrollView style={styles.container} tabLabel="退货/售后">
            <Pull
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
    backgroundColor: '#f0f0f0',
    paddingBottom: 10,
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
  title: {
    height: 25,
    paddingLeft: 15,
  },
  titleName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
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