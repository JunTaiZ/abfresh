import React, { Component } from "react";

import Index from "./component/Index";
import Classify from "./component/Classify";
import Cart from "./component/Cart";
import Mine from "./component/Mine";
import Search from "./component/second/Search";
import Header from './component/Header'
import Detail from './component/second/Detail'

import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Button,
  TouchableOpacity
} from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";
import TabNavigtor from "react-native-tab-navigator";
import { thisExpression } from "@babel/types";
import { white } from "ansi-colors";

const styles = StyleSheet.create({
  selectedTabText: {
    color: "rgb(237, 54, 16)"
  },
  tabText: {
    color: "rgb(200, 200, 200)"
  },
  icon: {
    width: 25,
    height: 25
  },
  navigator: {
    backgroundColor: "#fff",
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start'
  },
  tabBar: {
    backgroundColor: 'white',
    borderWidth: 0,
    elevation: 0,
  },
});
let title = "Home";
type Props = {};


// {
// 	this.state.selectedTab === 'Home' || 
// 	this.state.selectedTab === 'Classify' ? (
// 		<Header selectedTab={this.state.selectedTab} 
// 			navigation={navigation}
// 			style={styles.header}
// 		/>
// 	) : (
// 		<Text style={{ display: 'none' }}></Text>
// 	)
// }
// navigation.getParam('title') === 'Home' || 
// 				  navigation.getParam('title') === 'Classify' ?
// 					'flex' : 'none'
class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "Home",
      title: "Home",
      classify: 'fruit',
    };
  }
  static navigationOptions = ({ navigation, state }) => {
    return {
      headerTitle: <Header navigation={navigation} />,
      headerStyle: {
				height: 30,
        backgroundColor: 'white',
				display: navigation.getParam('title') === 'Home' || 
				  navigation.getParam('title') === 'Classify' ?
					'flex' : 'none',
				elevation: 0,
			},
    }
  };
  render() {
    let { navigation } = this.props;
    return (
      <View style={styles.navigator}>
        <StatusBar backgroundColor={"white"} 
          barStyle={'dark-content'}
        />
        <TabNavigtor
          tabBarStyle={styles.tabBar}
        >
          <TabNavigtor.Item
            selected={this.state.selectedTab === 'Home'}
            title="首页"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => {
              return (
                <Image
                  style={styles.icon}
                  source={require("./component/icons/home_tab.png")}
                />
              );
            }}
            renderSelectedIcon={() => {
              return (
                <Image
                  style={styles.icon}
                  source={require("./component/icons/home.png")}
                />
              );
            }}
            onPress={() => {
              this.setState({
                selectedTab: "Home"
							});
              return navigation.setParams({ title: "Home" });
            }}
          >
            <Index this={this} navigation={navigation} />
          </TabNavigtor.Item>
          <TabNavigtor.Item
            selected={this.state.selectedTab === "Classify"}
            title="分类"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => {
              return (
                <Image
                  style={styles.icon}
                  source={require("./component/icons/classify.png")}
                />
              );
            }}
            renderSelectedIcon={() => {
              return (
                <Image
                  style={styles.icon}
                  source={require("./component/icons/classify_tab.png")}
                />
              );
            }}
            onPress={() => {
              this.setState({
                selectedTab: "Classify",
              });
              return navigation.setParams({ title: "Classify" });
            }}
          >
            <Classify appThis={this} navigation={navigation} />
          </TabNavigtor.Item>
          <TabNavigtor.Item
            selected={this.state.selectedTab === "Cart"}
            title="购物车"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => {
              return (
                <Image
                  style={styles.icon}
                  source={require("./component/icons/cart.png")}
                />
              );
            }}
            renderSelectedIcon={() => {
              return (
                <Image
                  style={styles.icon}
                  source={require("./component/icons/cart_tab.png")}
                />
              );
            }}
            onPress={() => {
              this.setState({
                selectedTab: "Cart",
              });
              return navigation.setParams({ title: "Cart" });
            }}
          >
            <Cart />
          </TabNavigtor.Item>
          <TabNavigtor.Item
            selected={this.state.selectedTab === "Mine"}
            title="我的"
            titleStyle={styles.tabText}
            selectedTitleStyle={styles.selectedTabText}
            renderIcon={() => {
              return (
                <Image
                  style={styles.icon}
                  source={require("./component/icons/mine.png")}
                />
              );
            }}
            renderSelectedIcon={() => {
              return (
                <Image
                  style={styles.icon}
                  source={require("./component/icons/mine_tab.png")}
                />
              );
            }}
            onPress={() => {
              this.setState({
                selectedTab: "Mine",
              });
              return navigation.setParams({ title: "Mine" });
            }}
          >
            <Mine />
          </TabNavigtor.Item>
        </TabNavigtor>
      </View>
    );
	}
	componentDidMount() {
		this.props.navigation.setParams({title: 'Home'})
	}
}
const AppNavigator = createStackNavigator({
    Home: {
      screen: App
    },
    Search: {
      screen: Search
    },
    Detail: {
      screen: Detail
    },
	}, {
		mode: 'card',
		initialRouteName: "Home",
		defaultNavigationOptions: {
			headerStyle: {
        backgroundColor: "white",
				height: 30,
				elevation: 0,
				fontSize: 18,
			},
		}
	}
);
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
