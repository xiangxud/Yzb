/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Animated,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Provider} from 'mobx-react/native';
import codePush from "react-native-code-push";
import stores from './src/store';
import NetInfoDecorator from './src/common/NetInfoDecorator';
import YzbApp from './src';
import { Root } from 'native-base';
//import *as wechat from 'react-native-wechat'

if (!__DEV__) {
    global.console = {
        log: () => {}
    }
}

@NetInfoDecorator
export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            promptPosition: new Animated.Value(0),
        }
    }
    componentWillReceiveProps(nextProps) {
        const {isConnected} = nextProps
        // 无网络
        if (!isConnected) {
            Animated.timing(this.state.promptPosition, {
                toValue: 1,
                duration: 200
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(this.state.promptPosition, {
                        toValue: 0,
                        duration: 200
                    }).start()
                }, 5000);
            })
        }
    }
    componentWillMount(){
        codePush.disallowRestart();//页面加载的禁止重启，在加载完了可以允许重启
    }

    componentDidMount(){
        codePush.allowRestart();//在加载完了可以允许重启
        //wechat.registerApp('wxfeaf8f8278e018f1')
    }
    sync() {
        codePush.sync();
    }
    /** Update pops a confirmation dialog, and then immediately reboots the app */
    syncImmediate() {
        codePush.sync({
                installMode: codePush.InstallMode.IMMEDIATE,//启动模式三种：ON_NEXT_RESUME、ON_NEXT_RESTART、IMMEDIATE
                updateDialog: {
                    appendReleaseDescription:true,//是否显示更新description，默认为false
                    descriptionPrefix:"更新内容：",//更新说明的前缀。 默认是” Description:
                    mandatoryContinueButtonLabel:"立即更新",//强制更新的按钮文字，默认为continue
                    mandatoryUpdateMessage:"",//- 强制更新时，更新通知. Defaults to “An update is available that must be installed.”.
                    optionalIgnoreButtonLabel: '稍后',//非强制更新时，取消按钮文字,默认是ignore
                    optionalInstallButtonLabel: '后台更新',//非强制更新时，确认文字. Defaults to “Install”
                    optionalUpdateMessage: '有新版本了，是否更新？',//非强制更新时，更新通知. Defaults to “An update is available. Would you like to install it?”.
                    title: '更新提示'//要显示的更新通知的标题. Defaults to “Update available”.
                },
            },
        );
    }
    render() {
        let positionY = this.state.promptPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [-30, __IOS__ ? 20 : 0]
        });
        return (
            <Root>
                <View style={{flex: 1}}>
                    <Provider {...stores}>
                        <YzbApp />
                    </Provider>
                    <Animated.View style={[styles.netInfoView, {top: positionY}]}>
                        <Text style={styles.netInfoPrompt}>网络异常，请检查网络稍后重试~</Text>
                    </Animated.View>
                </View>
            </Root>
        )
    }
}

const styles = StyleSheet.create({
    netInfoView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        position: 'absolute',
        right: 0,
        left: 0,
        backgroundColor: 'red'
    },
    netInfoPrompt: {
        color: 'white',
        fontWeight: 'bold'
    }
})

AppRegistry.registerComponent('Yzb', () => App);
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
App = codePush(codePushOptions)(App);