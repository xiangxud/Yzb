/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Animated,
    StyleSheet,
    Text,
    Alert,
    YellowBox
} from 'react-native';
import {Provider} from 'mobx-react/native';
import codePush from "react-native-code-push";
import stores from './src/store';
import DeviceInfo from 'react-native-device-info';
import NetInfoDecorator from './src/common/NetInfoDecorator';
import YzbApp from './src';
import {Root} from 'native-base';
import * as wechat from 'react-native-wechat'
import {NativeModules} from 'react-native';

if (!__DEV__) {
    global.console = {
        log: () => {
        }
    }
}
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

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

    componentWillMount() {
        if(!__DEV__) {
            // 热更新
            codePush.disallowRestart();//页面加载的禁止重启，在加载完了可以允许重启
            // APK硬更新
            this.updateApk();
        }
    }

    updateApk = () => {
        fetch(urls.apis.APP_VERSION).then((response) => response.json()).then((v) => {
            if (v && v.versionName && v.versionName !== DeviceInfo.getReadableVersion()) {
                Alert.alert(
                    '养殖宝软件更新',
                    '需要您先下载并安装更新后才能继续使用。更新内容：\n' + v.description,
                    [
                        {text: '开始下载', onPress: () => {
                            NativeModules.DownloadApk.downloading(v.downloadUrl, "yzbUpdate.apk");
                        }},
                    ],
                    {cancelable: false}
                )
            }
        }).catch((error) => {
            //alert(JSON.stringify(error))
        });

        // NativeModules.DownloadApk.downloading(urls.webPath + "/content/yzb/apk/yzb_V18090614.apk", "yzb.apk");
    }

    componentDidMount() {
        codePush.allowRestart();//在加载完了可以允许重启
        //建议在应用启动时初始化，初始化之前无法使用此模块的其他方法。WeChat模块只需要初始化一次。
        //release版本为养殖宝公众号的app id
        let app_id = __DEV__ ? 'wxfeaf8f8278e018f1' : 'wxefcfed6d15fb76e4';
        wechat.registerApp(app_id)
    }

    sync() {
        codePush.sync();
    }

    /** Update pops a confirmation dialog, and then immediately reboots the app */
    syncImmediate() {
        codePush.sync({
                installMode: codePush.InstallMode.IMMEDIATE,//启动模式三种：ON_NEXT_RESUME、ON_NEXT_RESTART、IMMEDIATE
                updateDialog: {
                    appendReleaseDescription: true,//是否显示更新description，默认为false
                    descriptionPrefix: "更新内容：",//更新说明的前缀。 默认是” Description:
                    mandatoryContinueButtonLabel: "立即更新",//强制更新的按钮文字，默认为continue
                    mandatoryUpdateMessage: "",//- 强制更新时，更新通知. Defaults to “An update is available that must be installed.”.
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
                <Provider {...stores}>
                    <YzbApp/>
                </Provider>
                <Animated.View style={[styles.netInfoView, {top: positionY}]}>
                    <Text style={styles.netInfoPrompt}>网络异常，请检查网络稍后重试~</Text>
                </Animated.View>
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
let codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};
App = codePush(codePushOptions)(App);