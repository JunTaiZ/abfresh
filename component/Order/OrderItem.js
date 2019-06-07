import React, {Component} from 'react'
import { IP } from '../serverConfig.json'
import {
  View,
  Image,
  AsyncStorage,
  Text,
  StyleSheet,
  Alert,
} from 'react-native'

const ip = IP
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class ItemOfFresh extends Component {
  constructor(props) {
    super(props)
  }
  getStatus(status) {
    if (status === 1) return '商品准备中';
    if (status === 2) return '配送中';
    if (status === 3) return '已送达';
  }
  getPayed(payed) {
    if (payed === 0) {
      return '未付款'
    } else {
      return '已付款'
    }
  }
  render() {
    let {url, cost, name, cheap, payed, num, status} = this.props.item
    let {cartThis, telephone} = this.props
    let navigation = this.props.navigation
    return (
        <View style={[styles.cont, {opacity: cost === 0 ? 0 : 1}]} >
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
                <View style={styles.disRow}>
                  <Text style={styles.name}>{ name }</Text>
                  <Text style={styles.name}>{payed ? '已付款' : '未付款'}</Text>
                </View>
                <View style={styles.disRow}>
                  <Text style={styles.cheap}>￥{ cheap } × {num}</Text>
                  <Text style={styles.name}>实付：￥{ (cheap * num).toFixed(2) }</Text>
                </View>
                <View style={styles.disRow}>
                  <Text></Text>
                  <Text>{status === 1 ? '商品准备中' : status === 2 ? '配送中' : '已送达'}</Text>
                </View>
              </View>
            </View>
        </View>
      
    )
  }
}

const styles = StyleSheet.create({
  checkBox: {
    padding: 5,
  },
  ckImage: {
    height: 18,
    width: 18,
  },
  cont: {
    // borderRadius: 5,
    // paddingTop: 10,
    // paddingBottom: 10,
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'flex-end',
    // backgroundColor: 'white',
    // width: 300,
  },
  disRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    margin: 8,
    marginBottom: 0,
    backgroundColor: 'white',
  },
  textView: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  container: {
    borderRadius: 15,
  },
  picture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  image: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  name: {
    fontSize: 14,
    color: '#333',
  },
  cheap: {
    fontSize: 14,
    color: 'rgb(237, 56, 16)'
  },
})