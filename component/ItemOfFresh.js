import React, {Component} from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';

import {IP as ip} from './serverConfig.json'
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
          activeOpacity={0.9}
          onPress={() => navigation.push('Detail', {
            title: '商品详情'
          })}
          ref={'parent'}
          extra
          style={{display: cost === 0 ? 'none' : 'flex'}}
        >
          {
            cost > 0 ? (
              <View 
                style={styles.container}>
                <Image 
                  style={styles.picture}
                  source={{uri: `${ip}${url}`}}
                />
                <Text style={styles.name}>{ name }</Text>
                <Text style={styles.selled}>已售：{ selled }</Text>
                
              </View>
            ) : <Text></Text>
          }
        </TouchableHighlight>
        <View style={styles.down}>
          <View>
            <Text style={styles.cheap}>￥{ cheap }</Text>
            { cost > cheap ? <Text style={styles.cost}>￥{ cost }</Text> :
              <Text style={{display: 'none'}}></Text> 
            }
          </View>
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
    // borderBottomWidth: 1,
    padding: 3,
    marginTop: 6,
    width: 172,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    
    // elevation: 1,
    // shadowColor: '#ccc',
    // shadowOpacity: 1,
    // shadowOffset: {width: 10, height: 10}
  },
  container: {
    width: '100%',
    borderRadius: 15,
    flex: 1,
    flexDirection: 'column',
  },
  picture: {
    width: 152,
    height: 152,
    borderRadius: 76,
  },
  down: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3,
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