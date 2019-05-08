import React, { Component } from 'react'

import { IP } from './serverConfig.json'
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import {PullView} from 'react-native-pull'
let ip = IP

let width = Dimensions.get('screen').width
export default class Index extends Component {
	constructor(props) {
		super(props)
		this.state = {refreshing: false};
    this.topIndicatorRender = this.topIndicatorRender.bind(this);
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
	render() {
		let { appThis, navigation, renderData, height, onPullRelease } = this.props
		return (
		  <PullView
			  style={{width: width, height: height}}
			  onPullRelease={onPullRelease}
			  topIndicatorRender={this.topIndicatorRender}
				topIndicatorHeight={60}
			>
        {renderData()}
		  </PullView>
		)
	}
}

const styles = StyleSheet.create({
})