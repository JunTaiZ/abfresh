import React, { Component } from 'react'

import Index from './Index';
import Classify from './Classify';
import Cart from './Cart';
import Mine from './Mine';

import {
	StyleSheet,
	Text,
	View,
	Image,
	StatusBar,
} from 'react-native';

import TabNavigtor from 'react-native-tab-navigator'

const styles = StyleSheet.create({
	selectedTabText: {
		color: 'rgb(237, 54, 16)'
	},
	tabText: {
		color: 'rgb(200, 200, 200)'
	},
	icon: {
		width: 30,
		height: 25,
	},
	navigator: {
		backgroundColor: '#fff',
		flex: 1,
	},
})
type Props = {};
export default class Pages extends Component<Props> {
	constructor(props) {
		super(props)
		this.state = {
			selectedTab: 'Home'
		}
	}
	render() {
		return (
			<View style={styles.navigator}>
				<StatusBar translucent={true} />
				<TabNavigtor>
					<TabNavigtor.Item
						selected={this.state.selectedTab === 'Home'}
						title='首页'
						titleStyle={styles.tabText}
						selectedTitleStyle={styles.selectedTabText}
						renderIcon={() => {
							return (
								<Image
									style={styles.icon}
									source={require('./icons/home_tab.png')}
								/>
							)
						}}
						renderSelectedIcon={() => {
							return (
								<Image
									style={styles.icon}
									source={require('./icons/home.png')}
								/>
							)
						}}
						onPress={() => this.setState({ selectedTab: 'Home' })}
					>
						<Index />
					</TabNavigtor.Item>
					<TabNavigtor.Item
						selected={this.state.selectedTab === 'Classify'}
						title='分类'
						titleStyle={styles.tabText}
						selectedTitleStyle={styles.selectedTabText}
						renderIcon={() => {
							return (
								<Image
									style={styles.icon}
									source={require('./icons/classify.png')}
								/>
							)
						}}
						renderSelectedIcon={() => {
							return (
								<Image
									style={styles.icon}
									source={require('./icons/classify_tab.png')}
								/>
							)
						}}
						onPress={() => this.setState({ selectedTab: 'Classify' })}
					>
						<Classify />
					</TabNavigtor.Item>
					<TabNavigtor.Item
						selected={this.state.selectedTab === 'Cart'}
						title='购物车'
						titleStyle={styles.tabText}
						selectedTitleStyle={styles.selectedTabText}
						renderIcon={() => {
							return (
								<Image
									style={styles.icon}
									source={require('./icons/cart.png')}
								/>
							)
						}}
						renderSelectedIcon={() => {
							return (
								<Image
									style={styles.icon}
									source={require('./icons/cart_tab.png')}
								/>
							)
						}}
						onPress={() => this.setState({ selectedTab: 'Cart' })}
					>
						<Cart />
					</TabNavigtor.Item>
					<TabNavigtor.Item
						selected={this.state.selectedTab === 'Mine'}
						title='我的'
						titleStyle={styles.tabText}
						selectedTitleStyle={styles.selectedTabText}
						renderIcon={() => {
							return (
								<Image
									style={styles.icon}
									source={require('./icons/mine.png')}
								/>
							)
						}}
						renderSelectedIcon={() => {
							return (
								<Image
									style={styles.icon}
									source={require('./icons/mine_tab.png')}
								/>
							)
						}}
						onPress={() => this.setState({ selectedTab: 'Mine' })}
					>
						<Mine />
					</TabNavigtor.Item>
				</TabNavigtor>

			</View>
		)
	}
}

