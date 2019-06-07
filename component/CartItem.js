import React, {Component} from 'react'
import { IP } from './serverConfig.json'
import {
  View,
  Image,
  AsyncStorage,
  Text,
  StyleSheet,
  Alert,
} from 'react-native'
import CheckBox from 'react-native-check-box'

const ip = IP
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class ItemOfFresh extends Component {
  constructor(props) {
    super(props)
    this.changeCkBox = this.changeCkBox.bind(this)
  }
  changeCkBox() {
    let {url, selected} = this.props.item
    let {cartThis, appThis, telephone} = this.props
    cartThis.setState({
      activity: false
    })
    let change = {
      url,
      selected: selected === 1 ? 0 : 1,
    }
    // 改变单击的购物车生鲜的状态（选中或未选中） 数据库
    fetch(`${ip}/changeselected?telephone=${telephone}&selected=${change.selected}&url=${url}`, { 
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((responseJson) => {
      // 数据库修改成功后 改变单击的购物车生鲜的状态（选中或未选中） 前端状态
      let cartItems = appThis.state.cartItems
      let selectedNum = 0; // 购物车中选中的数目 用于标志全选
      for (item of cartItems) {
        if (item.url === change.url) { // // 改变单击的购物车生鲜的选中状态
          item.selected = change.selected
          if (item.selected === 1) {
            cartThis.setState({
              allMoney: Math.round((cartThis.state.allMoney + item.cheap*item.num)*100)/100
            })
          } else {
            cartThis.setState({
              allMoney: Math.round((cartThis.state.allMoney - item.cheap*item.num)*100)/100
            })
          }
        }
        if (item.selected === 1) {
          selectedNum += 1
        } 
      }
      if (cartThis.state.ckAll) {
        cartThis.setState({
          ckAll: false,
        })
      }
      if (selectedNum === cartItems.length) {
        cartThis.setState({
          ckAll: true,
        })
      }
      appThis.setState({
        cartItems: cartItems
      })
      cartThis.setState({
        activity: true
      })
		})
  }
  minusCart(telephone, url, num) {

    let {cartThis, appThis} = this.props
    cartThis.setState({
      activity: false
    })
    if (num === 0) {
      Alert.alert('购物车管理', '确定删除', [{
        text: '取消', onPress: () => {

        }
      }, {
        text: '确定', onPress: () => {
          fetch(`${ip}/deleteCart?telephone=${telephone}&url=${url}`, { 
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json()).then((responseJson) => {

            this.props.getCart()
            cartThis.setState({
              activity: true
            })
          }).catch(err =>{
            alert('删除出错')
          })
        }
      }])
      
    } else {
      fetch(`${ip}/minusCart?telephone=${telephone}&url=${url}`, { 
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json()).then((responseJson) => {

        this.props.getCart()
        cartThis.setState({
          activity: true
        })
      }).catch(err =>{
        alert('-操作出错');
      })
    }
  }
  addCart(telephone, url) {
    let {cartThis, appThis} = this.props
    cartThis.setState({
      activity: false
    })
    fetch(`${ip}/addCart?telephone=${telephone}&url=${url}`, { 
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((responseJson) => {

      this.props.getCart()
      cartThis.setState({
        activity: true
      })
    }).catch(err =>{
      alert('+操作出错');
    })
  }
  render() {
    let {url, cost, name, cheap, selled, num, selected} = this.props.item
    let {cartThis, telephone} = this.props
    let navigation = this.props.navigation
    return (
      <View style={styles.all}>
        <CheckBox 
          style={styles.checkBox}
          isChecked={selected === 1 ? true : false}
          onClick={this.changeCkBox}
          checkedImage={<Image source={require('./icons/checked.png')} style={styles.ckImage} />}
          unCheckedImage={<Image source={require('./icons/unchecked.png')} style={styles.ckImage} />}
        />
        <View style={[styles.cont, {opacity: cost === 0 ? 0 : 1}]} >
          <TouchableHighlight
            underlayColor='white'
            activeOpacity={0.5}
            onPress={() => navigation.push('Detail', {
              title: '商品详情'
            })}
            extra
            style={{display: cost === 0 ? 'none' : 'flex'}}
          >
            <View style={styles.touchable}>
              {
                cost > 0 ? (
                  <View 
                    style={styles.container}>
                    <Image 
                      style={styles.picture}
                      source={{uri: `${ip}${url}`}}
                    />
                  </View>
                ) : <Text></Text>
              }
              <View style={styles.textView}>
                <Text style={styles.name}>{ name }</Text>
                <Text style={styles.selled}>已售：{ selled }</Text>
                <Text style={styles.cheap}>￥{ cheap }</Text>
                { cost > cheap ? <Text style={styles.cost}>￥{ cost }</Text> :
                  <Text style={{display: 'none'}}></Text> 
                }
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.right}>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor={'white'}
              onPress={ this.minusCart.bind(this, telephone, url, num) }
              style={styles.addminusCon}
            >
              <Image source={require('./icons/minus.png')} style={styles.addminus} />
            </TouchableHighlight>
            <Text style={styles.count}>{num}</Text>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor={'white'}
              onPress={ this.addCart.bind(this, telephone, url) }
              style={styles.addminusCon}
            >
              <Image source={require('./icons/add.png')} style={styles.addminus} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  addminus: {
    height: 10,
    width: 10,
  },
  addminusCon: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 2,
    borderRadius: 8,
    margin: 2,
  },
  all: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2,
    marginRight: 2,
    padding: 5,
  },
  checkBox: {
    padding: 5,
  },
  ckImage: {
    height: 18,
    width: 18,
  },
  cont: {
    // borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // backgroundColor: '#eee',
    // width: 300,
  },
  count: {
    fontSize: 15,
    color: '#555',
    paddingLeft: 10,
    paddingRight: 10,
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
  },
  textView: {
    width: 120,
    marginLeft: 10,
  },
  container: {
    borderRadius: 15,
  },
  picture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  right: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  name: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  selled: {
    fontSize: 11,
    color: '#888',
  },
  cheap: {
    marginTop: 10,
    fontSize: 14,
    color: 'rgb(237, 56, 16)'
  },
  cost: {
    textDecorationLine: 'line-through',
    textDecorationColor: '#aaa',
    color: '#aaa',
    fontSize: 11
  },
})