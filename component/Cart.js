import React, { Component } from 'react'
import Title from './SimpleTitle'
import CartItem from './CartItem'
import {IP as ip} from './serverConfig.json'
import Activity from './Activity'
import CheckBox from 'react-native-check-box'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Image,
  TouchableHighlight,
} from 'react-native';
import Pull from './Pull'

// <StatusBar backgroundColor={'rgb(237, 56, 16)'}/>
export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ckAll: false,
      activity: false,
      allMoney: 0,
    }
    this.getCart = this.getCart.bind(this)
    this.changeCkBox = this.changeCkBox.bind(this)
    this.renderData = this.renderData.bind(this)
    this.setCartItems = this.setCartItems.bind(this)
    this.initAllMoney = this.initAllMoney.bind(this)
    this.getCart()
  }
  initAllMoney(cartItems) {
    let allMoney = 0;
    for (item of cartItems) {
      if (item.selected !== 0) {
        allMoney += item.cheap * item.num
      }
    }
    allMoney = Math.round(allMoney*100)/100
    this.setState({
      allMoney
    })
  }
  payClick(cartThis, appThis) {
    Alert.alert('确认付款', `${cartThis.state.allMoney} ￥`, [{
      text: '取消', onPress: () => {

      }
    }, {
      text: '付款', onPress: this.pay.bind(cartThis, cartThis, appThis)
    }])
  }
  pay(cartThis, appThis) {
    this.setState({
      activity: false
    })
    let {cartItems, user} = appThis.state
    fetch(`${ip}/makeOrder?telephone=${user.telephone}`, { // 把用户telephone的购物车列表全改为选中或未选中
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((responseJson) => {
      // cartItems = cartItems.filter((value) => {
      //   return value.selected === 0;
      // })
      // appThis.setState({
      //   cartItems
      // })
      // this.setState({
      //   activity: true
      // })
      this.getCart()
    }).catch(err => {
      alert('payerr')
      console.log(err)
    })
  }
  // 设置全部选中与未选中
  setCartItems(appThis, num) {
    let {cartItems} = appThis.state
    console.log(cartItems)
    let allMoney = 0;
    for (item of cartItems) {
      item.selected = num
      if (num !== 0) {
        allMoney += item.cheap * item.num
      }
    }
    allMoney = Math.round(allMoney*100)/100
    this.setState({
      allMoney
    })
    appThis.setState({
      cartItems: cartItems
    })
    
  }
  changeCkBox() {
    let {appThis} = this.props
    let {telephone, url, name} = appThis.state.user

    this.setState({
      activity: false
    })
    let num, request 
    if (!this.state.ckAll) {
      num = 1;
      request = 'setCartAll'
    } else {
      num = 0;
      request = 'unsetCartAll'
    }
    fetch(`${ip}/${request}?telephone=${telephone}`, { // 把用户telephone的购物车列表全改为选中或未选中
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((responseJson) => {
      this.setCartItems(appThis, num)
      this.setState({
        ckAll: num ? true : false,
        activity: true,
      })
    })
    
  }
  getCart(e) {
    let {appThis} = this.props
    let {telephone, url, name} = appThis.state.user
    fetch(`${ip}/getcart?telephone=${telephone}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((responseJson) => {
      appThis.setState({
        cartItems: responseJson,
      })

      this.initAllMoney(responseJson)
      let selected = responseJson.filter((value, index) => {
        return value.selected === 1;
      })
      if (selected.length === responseJson.length) {
        this.setState({
          ckAll: true
        })
      }
      if (this.state.activity) {
        e()
      } else {
        this.setState({
          activity: true
        })
      }
		}).catch(err => {
      console.log(err)
    })
  }
  renderData() {
    let {appThis, navigation} = this.props
    return(
      <ScrollView style={styles.cartList}>
        {appThis.state.cartItems.map((item, index) => {
          return (
            <CartItem
              getCart={this.getCart}
              telephone={appThis.state.user.telephone}
              item={item}
              navigation={navigation}
              cartThis={this}
              appThis={appThis}
            />
          )
        })}
      </ScrollView>
    )
  }
  render() {
    let {appThis, navigation} = this.props
    let {allMoney} = this.state
    let {cartItems} = appThis.state
    return(
      <View style={styles.container}>
        <Activity activity={this.state.activity} />
        <Title
          name={'购物车'}
        />
        <View><Text></Text></View>
        <Pull
          renderData={this.renderData}
          onPullRelease={this.getCart}
          height={appThis.state.cartItems.length * 50}
        />
        
        <View>
          <View style={styles.bottom}>
            <CheckBox 
              rightText={'全选'}
              rightTextStyle={styles.rightText}
              ref={(ref) => this.checkBox = ref}
              style={styles.checkBox}
              isChecked={this.state.ckAll}
              onClick={this.changeCkBox}
              checkedImage={<Image source={require('./icons/checked.png')} style={styles.image} />}
              unCheckedImage={<Image source={require('./icons/unchecked.png')} style={styles.image} />}
            />
            <View style={styles.money}>
              <Text>{allMoney} ￥</Text>
            </View>
            <TouchableHighlight
              activeOpacity={0.8}
              underlayColor={'rgb(247, 64, 26)'}
              onPress={ this.payClick.bind(this, this, appThis) }
              style={styles.pay}
            >
              <Text style={styles.payText}>去结算 ></Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cartList: {
    marginTop: 26,
    backgroundColor: 'white',
    borderRadius: 15,
    marginLeft: 12,
    marginRight: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  checkBox: {
    margin: 5,
    marginLeft: 10,
    flex: 1,
    borderRadius: 4,
    padding: 5,
  },
  image: {
    height: 18,
    width: 18,
  },
  money: {
    width: 100,
  },
  pay: {
    backgroundColor: 'rgb(237, 54, 16)',
    padding: 15,
    paddingLeft: 18,
    paddingRight: 25,
    margin: 0,
  },
  payText: {
    fontSize: 16,
    color: 'white',
  },
  rightText: {
    fontSize: 16,
    color: 'gray',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 0,
  }
})