import React, {Component} from 'react'
import { IP } from './serverConfig.json'
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native'
const ip = IP
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class ItemOfFresh extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let {url, cost, name, cheap, selled} = this.props.item
    let navigation = this.props.navigation
    return (
      <View style={[styles.cont, {opacity: cost === 0 ? 0 : 1}]} >
        <TouchableHighlight
          underlayColor='white'
          activeOpacity={0.5}
          onPress={() => navigation.push('Detail', {
            title: '商品详情'
          })}
          ref={'parent'}
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
        <View style={styles.down}>
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor={'white'}
            onPress={ (e) => this.addCart(e) }
            ref={'addCart'}
            style={{display: cost === 0 ? 'none' : 'flex'}}
          >
            <Image 
              style={styles.image}
              source={require('./icons/add_cart.png')}
            />
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cont: {
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7',
    marginBottom: 6,
    marginTop: 6,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: 'white',
    // borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // backgroundColor: '#eee',
    // width: 300,
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
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
  down: {
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