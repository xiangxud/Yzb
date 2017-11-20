import React, {PureComponent} from "react";
import {StyleSheet, View, Image,Platform} from "react-native";

export default  class Container extends PureComponent {

	render() {
		let {children, isTabPanel} = this.props,
			width = theme.deviceWidth;
		if(Platform.OS=='ios'){
			var height = theme.deviceHeight;
		}else{
			var height = theme.deviceHeight - 20;
		}

		if (isTabPanel) {
			height -= theme.navTabBarHeight;
		}

		return (
			<View style={{width,height,alignSelf: "stretch"}}>
				{children}
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1
	},
})


