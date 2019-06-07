import React, { Component } from 'react'
import OrderIcon from './OrderIcon' 
import { IP as ip } from './serverConfig.json'
import IndexList from './IndexList'

import {
  AsyncStorage,
  StyleSheet,
  Text,
  Alert,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  PanResponder,
} from 'react-native';

import {PanResponderInstance, GestureState} from 'PanResponder';
import {PressEvent} from 'CoreEventTypes';
import { HeaderStyleInterpolator } from 'react-navigation';

let headerStyle = {
  opacity: 0,
}
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
const orderIcons = [{
  url: `${ip}/images/icons/pay.png`,
  name: '待付款',
  id: 'pay',
}, {
  url: `${ip}/images/icons/recieve.png`,
  name: '待收货',
  id: 'recieve',
}, {
  url: `${ip}/images/icons/feedback.png`,
  name: '待评价',
  id: 'feedback',
}, {
  url: `${ip}/images/icons/return.png`,
  name: '退换/售后',
  id: 'return',
}, {
  url: `${ip}/images/icons/order_.png`,
  name: '我的订单',
  id: 'order',
},]


let getCareful = (float) => {
  if (float < 50) return float * 1.3
  else if (float < 100) return float * 1.2 + 15
  else if (float <= 125) return float * 1.1 + 25
}
export default class Index extends Component {
  static navigationOptions = {
    tabBarLabel: '我的',
    //drawerLabel:'页面2'
  };
  constructor(props) {
    super(props)
    this.onScroll = this.onScroll.bind(this)
    AsyncStorage.getItem('user').then((res) => {
      let resJson = JSON.parse(res)
      if (resJson.name === undefined) {
        resJson.name = '登录'
        resJson.telephone = ''
      }
      this.props.appThis.setState({
        user: resJson
      })
    }).catch((err) => {
      alert('err');
      this.props.appThis.setState({
        user: {name: '登录', telephone: ''}
      })
    })
  }
  
  onScroll() {
    this.refs.headerScroll.measure((fx, fy, width, height, px, py) => {
      // console.log(py)
      if (py >= -150) {
        this.props.appThis.setState({
          mineOpacity: Math.abs(py) / 150,
          backgroundColor: `rgba(255, 255, 255, ${Math.abs(py) / 150})`,
          barStyle: Math.abs(py) / 150 > 0.5 ? 'dark-content' : 'light-content',
        })
      } else {
        this.props.appThis.setState({
          mineOpacity: 1,
          backgroundColor: 'white',
          barStyle: 'dark-content',
        })
      }
      console.log(this.props.appThis.state.mineOpacity)
    })
  }
  
  componentDidMount() {
  }
  render() {
    let { appThis } = this.props
    let {name, telephone} = appThis.state.user
    return (
      <View style={styles.all}>
        <View style={[styles.header, {
          backgroundColor: `rgba(255, 255, 255, ${appThis.state.mineOpacity})`,
        }]}>
          <Text style={[styles.mine, {
            opacity: appThis.state.mineOpacity > 0.5 ? 1 : 0,
          }]}>我的</Text>
          <TouchableOpacity
            onPress={() => {
              appThis.setState({
                login: appThis.state.login === `${ip}/images/icons/login.png` ?
                  `${ip}/images/icons/login_2.png` : `${ip}/images/icons/login.png`
              })
            }}
          >
            <Image 
              style={appThis.state.mineOpacity > 0.5 ? styles.login : {}}
              source={{uri: appThis.state.login}}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          scrollEventThrottle={1000}
          onScroll={this.onScroll}
          style={styles.container}
        >
          <View style={styles.headerScroll}
            ref={'headerScroll'}
          >
            <TouchableOpacity
              style={styles.mineInfo}
              onPress={() => {
                if (appThis.state.user.name !== '登录') {
                  Alert.alert('注销', '是否注销', [{
                    text: '取消', onPress: () => {

                    }
                  }, {
                    text: '确定', onPress: () => {
                      this.props.appThis.setState({
                        user: {name: '登录'}
                      })
                    }
                  }])
                } else {
                  appThis.props.navigation.push('Login', {
                    appThis: appThis
                  })
                }
              }}
            >
              <Image 
                style={{width: 60, height: 60}}
                source={{uri: appThis.state.headImg}}
              />
              <Text style={styles.mineName}>{name}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.orderContainer}>
            <View style={styles.allOrder}>
              <Text style={styles.myOrder}>我的订单</Text>
              <TouchableOpacity 
                onPress={() => {
                  appThis.props.navigation.push('Order', {
                    title: '订单'
                  })
                }}
              >
              <Text>全部订单 ></Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ordericons} shadowColor={'#eee'}
              shadowOffset={{width: 2, height: 2}}
            >
              {
                orderIcons.map((item) => {
                  return (
                    <OrderIcon
                      key={item.id}
                      url={item.url}
                      name={item.name}
                      id={item.id}
                    />
                  )
                })
              }
            </View>
          </View>
          <Text style={styles.ad}>为你推荐</Text>
          <IndexList
            navigation={appThis.props.navigation}
            hotSell={appThis.state.hotSell}
          />
        </ScrollView>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  ad: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 3,
  },
  all: {
    flex: 1,
  },
  allOrder: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerScroll: {
    paddingLeft: 15,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: 'rgb(237, 54, 16)',
  },
  mineInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mineName: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginLeft: 15,
  },
  header: {
    marginTop: 28,
    paddingTop: 4,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 8,
    width: '100%',
    position: 'absolute',
    flex: 1,
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mine: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  myOrder: {
    color: 'black',
    fontSize: 18,
    margin: 5,
  },
  orderContainer: {
    marginTop: 8,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    paddingTop: 7,
    marginRight: 8,
    marginLeft: 8,
    marginBottom: 8,
  },
  ordericons: {
    marginTop: 18,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  login: {
    width: 22,
    height: 22,
  }
})