import React, {PureComponent} from "react";
import {
	WebView,
	View,
	Image,
	Text,
    TouchableOpacity,
    BackHandler
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class InfcnWebView extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            url: "http://m.ringpu.com/ringpu/html_php/activity/live.html",
			ref: this.props.ref? this.props.ref: '_webview',
            title: "",
            loading: true,
            isBackButtonEnable: false,
            isForwardButtonEnable: false
        }
    }
    static defaultProps = {
        canBack: true,
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", ()=> {
            try {
                if (this.state.isBackButtonEnable) {
                    this.refs[this.state.ref].goBack();//返回上一个页面
                    return true;//true 系统不再处理 false交给系统处理
                }
            } catch (error) {
                return false;
            }
            return false;
        })
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress");
    }
    _onNavigationStateChange = (navState) => {
        //alert(JSON.stringify(navState))
        this.setState({
            url: navState.url,
            title: navState.title,
            loading: navState.loading,
            isBackButtonEnable: navState.canGoBack && this.props.canBack,
            isForwardButtonEnable: navState.canGoForward,
        })
    }
    reload = () => {
        this.refs[this.state.ref].reload();
    };
    renderError() {
        return (
			<View style={styles.errorView}>
				<TouchableOpacity onPress={()=>this.reload()} style={styles.errorView}>
					<Icon name={'bug'} size={88} color={'#bbbbbb'} />
					<Text>访问出现问题，点击刷新</Text>
				</TouchableOpacity>
			</View>
        )
    }
	render() {
		let {uri} = this.props;
		return (
			<WebView
				ref={this.state.ref}
				source={{uri}}
				style={this.props.style}
				onMessage={this.props.onMessage}
				onNavigationStateChange={(navState)=>this._onNavigationStateChange(navState)}
				startInLoadingState={true}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				scalesPageToFit={false}
				scrollEnabled={true}
				renderError={this.renderError.bind(this)}
			/>
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