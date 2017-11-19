import React, {PureComponent} from "react";
import {WebView, View, Image, Text} from "react-native";

export default class InfcnWebView extends PureComponent {
	render() {
		let {uri} = this.props;
		return (
			<WebView
				ref={(e) => this._webview = e}
				source={{uri}}
				style={this.props.style}
				onMessage={this.props.onMessage}
				startInLoadingState={true}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				scalesPageToFit={false}
				scrollEnabled={true}
				renderError={this.renderError.bind(this)}
			/>
		)
	}

	renderError() {
		return (
			<View style={styles.errorView}>
				<Image source={require('../../resource/error.png')}/>
				<Text>网络不给力，请稍后再重试。</Text>
			</View>
		)
	}
}

const styles = {
	errorView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
}