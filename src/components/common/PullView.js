import React, {PureComponent} from "react";
import {StyleSheet, ScrollView, Text, RefreshControl} from "react-native";

export default class Loading extends PureComponent {

	render() {
		let {isRefreshing, children} =  this.props;
		return (
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={this._onRefresh.bind(this)}
						colors={['#E24329', '#51C332', '#3296FF']}
					/>
				}
			>
				{children}
			</ScrollView>
		)
	}

	_onRefresh() {
		let {onRefresh} = this.props;
		if (onRefresh) {
			onRefresh();
		}
	}

}

const styles = StyleSheet.create({})