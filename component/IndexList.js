import React, { Component } from "react";

import { StyleSheet, Text, View } from "react-native";
import ItemOfFresh from "./ItemOfFresh";

export default class Index extends Component {
  render() {
    let {navigation, hotSell} = this.props
    return (
      <View style={styles.hotSell}>
        {hotSell.map((item, index) => (
          <ItemOfFresh
            item={item}
            navigation={navigation}
            key={`${item.url}_${index}`}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hotSell: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  }
});
