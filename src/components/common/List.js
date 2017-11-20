import React, {PureComponent} from "react";
import {StyleSheet, View} from "react-native";
import PropTypes from 'prop-types';

export default class List extends PureComponent {

	render() {
		let {children, style} = this.props;
		let listStyle = Object.assign({}, styles.list, style || {});
		return (
			<View style={listStyle}>
				{children}
			</View>
		)
	}

}


const styles = {
	list: {
		paddingTop:5,
		paddingBottom:5,
		paddingLeft:10,
		backgroundColor: '#FFFFFF',
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#cbd2d9',
	}
}

List.propTypes = {
	style: PropTypes.object
}