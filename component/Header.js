import React, { Component } from "react";

import {
  StyleSheet, 
  Text, 
  View, 
  Image,
  TouchableOpacity,
} from "react-native";

export default class Header extends Component {
  render() {
    return (
      <View style={styles.headerTitle}>
          <Text style={styles.headerText}>今日达</Text>
          <TouchableOpacity activeOpacity={0.5}
            style={styles.changeAddress}
          >
            <Text style={styles.addressText}>华东理工</Text>
            <Image
              source={require("./icons/more.png")}
              style={styles.headerImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.search}
            onPress={() => this.props.navigation.push("Search")}
          >
            <Image
              source={require("./icons/search.png")}
              style={styles.headerImage}
            />
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	headerImage: {
		height: 28,
		width: 28,
	},
	headerTitle: {
		flexDirection: 'row',
		backgroundColor: 'white',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
	},
	headerText: {
    color: 'rgb(237, 54, 16)',
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '600',
  },
  changeAddress: {
    flex: 1,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  addressText: {
    color: 'black',
    fontSize: 18,
  },
  search: {
    marginRight: 20
  }
})