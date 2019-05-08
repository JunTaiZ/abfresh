import React, { Component } from 'react'
import ClassifyItem from './ClassifyItem'
import Pull from './Pull'

import { IP } from './serverConfig.json'
import {
	StyleSheet,
	Text,
	ScrollView,
	FlatList,
	View,
	ActivityIndicator,
	Dimensions,
	StatusBar,
	TouchableOpacity,
} from 'react-native';
import {PullView} from 'react-native-pull'
let ip = IP

let height = Dimensions.get('screen').height - 107
let width = Dimensions.get('screen').width
export default class Index extends Component {
	constructor(props) {
		super(props)
		this.state = {refreshing: false};
		this.onPullRelease = this.onPullRelease.bind(this);
		this.renderList = this.renderList.bind(this)
		this.getData = this.getData.bind(this)
		this.getClassify = this.getClassify.bind(this)
	}
	componentDidMount() {
		this.getData()
	}
	topIndicatorRender(pulling, pullok, pullrelease) {
		const hide = {position: 'absolute', left: 10000};
		const show = {position: 'relative', left: 0};
		setTimeout(() => {
				if (pulling) {
						this.txtPulling && this.txtPulling.setNativeProps({style: show});
						this.txtPullok && this.txtPullok.setNativeProps({style: hide});
						this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
				} else if (pullok) {
						this.txtPulling && this.txtPulling.setNativeProps({style: hide});
						this.txtPullok && this.txtPullok.setNativeProps({style: show});
						this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
				} else if (pullrelease) {
						this.txtPulling && this.txtPulling.setNativeProps({style: hide});
						this.txtPullok && this.txtPullok.setNativeProps({style: hide});
						this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
				}
		}, 1);
		return (
			<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
				<ActivityIndicator size="small" color="gray" />
				<Text ref={(c) => {this.txtPulling = c;}}> 下拉刷新</Text>
				<Text ref={(c) => {this.txtPullok = c;}}> 松开刷新</Text>
				<Text ref={(c) => {this.txtPullrelease = c;}}> 玩命刷新中</Text>
	    </View>
    );
	}
	onPullRelease(resolve) {
		fetch(`${ip}/search?cost=0`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((responseJson) => {
      this.props.appThis.setState({
				classifyItems: responseJson
			})
			resolve()
		})
  }
	getData() {
		fetch(`${ip}/search?cost=0`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((responseJson) => {
      this.props.appThis.setState({
				classifyItems: responseJson
			})
    })
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
			classifyName: '淡水鱼'
		}, ]
		return classify
	}
	renderList() {
		let {appThis, navigation} = this.props
		return(
			<View style={styles.containerList}>
				<FlatList
					style={styles.list}
					data={appThis.state.classifyItems.filter((item) => {
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
	render() {
		let { appThis, navigation } = this.props
		let filterItems = appThis.state.classifyItems.filter((item) => {
			return item.classify === appThis.state.classify
		})
		return (
		<View style={styles.container}>
			<View>
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
			</View>
		  <Pull
			  height={filterItems.length * 120}
				onPullRelease={this.onPullRelease}
				renderData={this.renderList}
			/>
    </View>
		)
	}
}

const styles = StyleSheet.create({
	pullView: {
		height,
		width,
	},
	container: {
		flex: 1,
		flexDirection: 'row',
	},
	containerList: {
	},
	list: {
		width: '100%',
	},
	tabs: {
		flex: 1,
		width: 85,
		backgroundColor: '#f8f8f8',
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