import React, {PureComponent} from "react";
import {Modal, View, Image, TouchableOpacity} from "react-native";
import PropTypes from 'prop-types';
/**
 * BaseModal
 */
export default class BaseModal extends PureComponent {

	static propTypes = {
		visible: PropTypes.bool,
		white: PropTypes.bool, // 背景白色
		transparent: PropTypes.bool, // 背景透明
	}

	static defaultProps = {
		visible: false,
		white:true,
		transparent:false,
	}

	constructor(props) {
		super(props);
		this.state = {
			visible: props.visible,
		}
	}

	render() {
		let {visible} = this.state;
		let {children,transparent,white} = this.props;
		let content={
				position: "absolute",
				top: 30,
				bottom: 30,
				left: 20,
				right: 20,
				opacity: 1,
				flex: 1,
			};
		if(transparent){
			content.backgroundColor='transparent'
		}else if(white){
			content.backgroundColor='#fff'
		}
		return (
			<Modal
				animationType={'fade'}
				transparent={true}
				visible={visible}
				onRequestClose={() => this.hide()}
			>
				<TouchableOpacity onPress={() => this.hide()}>
					<View style={styles.opacityView}/>
				</TouchableOpacity>
				<View style={content}>
					{children}
				</View>
			</Modal>
		)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.visible != this.state.visible) {
			this.setState({
				visible: nextProps.visible
			})
		}
	}

	/**
	 * 打开对话框
	 */
	show() {
		this.setState({
			visible: true,
		})
	}

	/**
	 * 关闭对话框
	 */
	hide() {
		this.setState({
			visible: false
		})
	}
}


const styles = {
	opacityView: {
		flex: 1,
		backgroundColor: '#6c6c6c',
		opacity: 0.5,
	},
	content: {
		position: "absolute",
		top: 30,
		bottom: 30,
		left: 20,
		right: 20,
		opacity: 1,
		flex: 1,
	},
};
