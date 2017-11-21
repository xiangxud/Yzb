import React, {PureComponent} from "react";
import {StyleSheet, View} from "react-native";

export default  class Container extends PureComponent {
	render() {
		let {children} = this.props;
		return (
			<View style={[styles.container, {alignSelf: "stretch"}]}>
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


