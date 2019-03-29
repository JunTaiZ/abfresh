import React, { Component } from 'react'
import ClassifyItem from './ClassifyItem'

import { IP } from './serverConfig.json'
import {
	StyleSheet,
	Text,
	ScrollView,
	FlatList,
	View,
	StatusBar,
	TouchableOpacity,
} from 'react-native';
let ip = IP
export default class Index extends Component {
	constructor(props) {
		super(props)
		this.getData = this.getData.bind(this)
		this.getClassify = this.getClassify.bind(this)
	}
	getData() {
		let hotSell = [{
			classify: 'fruit',
			url: `${ip}/images/apple.jpg`,
			name: '苹果200g',
			vip: false,
			limitTime: true,
			cost: 15.00,
			cheap: 14.30,
			selled: 2000,
		}, {
			classify: 'fruit',
			url: `${ip}/images/banana.jpg`,
			name: '香蕉200g',
			vip: false,
			limitTime: true,
			cost: 12.00,
			cheap: 9.00,
			selled: 502,
		}, {
			classify: 'seafood',
			url: `${ip}/images/yaoxie.jpg`,
			name: '药蟹500g',
			vip: false,
			limitTime: false,
			cost: 35.00,
			cheap: 35.00,
			selled: 116,
		}, {
			classify: 'meat',
			url: `${ip}/images/zhurou2.jpg`,
			name: '猪肉300g',
			vip: true,
			limitTime: false,
			cost: 23.00,
			cheap: 22.00,
			selled: 231,
		}, {
			classify: 'vege',
			url: `${ip}/images/tomato.jpg`,
			name: '番茄200g',
			vip: false,
			limitTime: true,
			cost: 15.00,
			cheap: 13.00,
			selled: 601,
		}, {
			classify: 'fish',
			url: `${ip}/images/qiudaoyu.jpg`,
			name: '秋刀鱼300g',
			vip: false,
			limitTime: false,
			cost: 25.00,
			cheap: 25.00,
			selled: 200,
		}, {
			classify: 'seafood',
			url: `${ip}/images/balangyu.jpg`,
			name: '巴浪鱼250g',
			vip: false,
			limitTime: true,
			cost: 15.00,
			cheap: 14.30,
			selled: 2020,
		}, {
			classify: 'seefood',
			url: `${ip}/images/zhangyu.jpg`,
			name: '章鱼250g',
			vip: true,
			limitTime: false,
			cost: 19.00,
			cheap: 15.00,
			selled: 522,
		}, {
			classify: 'seefood',
			url: `${ip}/images/yaoxie.jpg`,
			name: '药蟹500g',
			vip: false,
			limitTime: false,
			cost: 35.00,
			cheap: 35.00,
			selled: 116,
		}, {
			classify: 'meat',
			url: `${ip}/images/zhurou2.jpg`,
			name: '猪肉300g',
			vip: true,
			limitTime: false,
			cost: 23.00,
			cheap: 22.00,
			selled: 231,
		}, {
			classify: 'vege',
			url: `${ip}/images/tomato.jpg`,
			name: '番茄200g',
			vip: false,
			limitTime: true,
			cost: 15.00,
			cheap: 13.00,
			selled: 601,
		}, {
			classify: 'fish',
			url: `${ip}/images/qiudaoyu.jpg`,
			name: '秋刀鱼300g',
			vip: false,
			limitTime: false,
			cost: 25.00,
			cheap: 25.00,
			selled: 200,
		}, ]
		return hotSell
	}
	getClassify() {
		let classify = [{
			classify: 'fruit',
			classifyName: '水果'
		}, {
			classify: 'meat',
			classifyName: '鲜肉'
		}, {
			classify: 'vege',
			classifyName: '有机蔬菜'
		}, {
			classify: 'seafood',
			classifyName: '海鲜'
		}, {
			classify: 'fish',
			classifyName: '河鱼'
		}, ]
		return classify
	}

	render() {
		let { appThis, navigation } = this.props
		return (
			<View style={styles.container}>
				<ScrollView style={styles.tabs}>
					{
						this.getClassify().map((item) => {
							return <TouchableOpacity
								onPress={() => appThis.setState({
									classify: item.classify,
								})}
								activeOpacity={0.8}
								style={[
									styles.tab,
									item.classify === appThis.state.classify ? 
									  styles.currentTab : styles.unactive
								]}
								key={item.classify+'_'}
							>
								<Text
								style={
									item.classify === appThis.state.classify ? 
									  styles.activeText : styles.unactiveText
								}>{item.classifyName}</Text>
							</TouchableOpacity>
						})
					}
				</ScrollView>
				<FlatList
				  sytle={styles.list}
					data={this.getData().filter((item) => {
						return item.classify === appThis.state.classify
					})}
					renderItem={({item}) => (
						<ClassifyItem 
							item={item}
							navigation={navigation}
						/>
					)}
					keyExtractor={(item, index) => item.url+index}
				>
				</FlatList>
      </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		paddingLeft: 85,
		// flex: 1,
		// flexDirection: 'row',
	},
	list: {
		width: '100%',
	},
	tabs: {
		position: 'absolute',
		width: 85,
		backgroundColor: '#f8f8f8'
	},
	tab: {
		paddingLeft: 10,
		height: 45,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	currentTab: {
		backgroundColor: 'white',
		borderLeftWidth: 2,
		borderLeftColor: 'rgb(237, 54, 16)',
	},
	unactive: {
	},
	activeText: {
		color: 'rgb(237, 54, 16)',
		fontWeight: '600',
	},
	unactiveText: {
		color: '#333'
	}
})