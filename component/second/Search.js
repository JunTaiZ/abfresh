import React, { Component } from 'react'
import SearchTitle from './SearchTitle'
import Item from '../ClassifyItem'
import {
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      freshItems: []
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <SearchTitle navigation={navigation} />,
      gesturesEnabled: true,
    };
  };
  render() {
    return (
      <View>
        <ScrollView>
          {
            this.props.navigation.getParam('freshItems', []).map((item, index) => {
              return(
                <Item
                  navigation={this.props.navigation}
                  item={item}
                  key={`${item}_${index}`}
                />
              )
            })
          }
        </ScrollView>
      </View>
    )
  }
}