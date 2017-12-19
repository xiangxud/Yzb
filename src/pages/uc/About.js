import React, {Component} from "react";
import {
    Image,
    Alert
} from 'react-native';
import {Body, Icon, Left, ListItem, Right, Text, View} from "native-base";
import {SeparatorArea} from "../../components";
import codePush from "react-native-code-push";

const Item = props => {
    return (
        <ListItem
            icon
            style={{backgroundColor:'#fff',marginLeft: 0,paddingLeft: 15}}
            onPress={props.goToPage ? props.goToPage : null}>
            <Left>
                <Icon name={props.icon} style={props.iconStyle}/>
            </Left>
            <Body style={props.bordered?{}:{borderBottomWidth: 0}}>
            <Text>{props.text}</Text>
            </Body>
            <Right style={props.bordered?{}:{borderBottomWidth: 0}}>
                <Text>{props.subtext? props.subtext: null}</Text>
                {
                    props.goToPage ?
                        <Icon name="ios-arrow-forward"/>
                        : null
                }
            </Right>
        </ListItem>
    );
}

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = { restartAllowed: true };
    }
    goToPage = (page, params) => {
        const { navigation } = this.props;
        params = params ? params : {};
        navigation && navigation.navigate(page, params)
    }

    codePushStatusDidChange(syncStatus) {
        switch(syncStatus) {
            case codePush.SyncStatus.CHECKING_FOR_UPDATE:
                this.setState({ syncMessage: "正在检查更新。" });
                break;
            case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.setState({ syncMessage: "正在下载更新包。" });
                break;
            case codePush.SyncStatus.AWAITING_USER_ACTION:
                this.setState({ syncMessage: "等待您的操作。" });
                break;
            case codePush.SyncStatus.INSTALLING_UPDATE:
                this.setState({ syncMessage: "正在安装更新。" });
                break;
            case codePush.SyncStatus.UP_TO_DATE:
                this.setState({ syncMessage: "应用已经是最新。", progress: false });
                break;
            case codePush.SyncStatus.UPDATE_IGNORED:
                this.setState({ syncMessage: "用户取消更新。", progress: false });
                break;
            case codePush.SyncStatus.UPDATE_INSTALLED:
                this.setState({ syncMessage: "更新完毕，将重新启动养殖宝使更新生效。", progress: false });
                break;
            case codePush.SyncStatus.UNKNOWN_ERROR:
                this.setState({ syncMessage: "升级版本出现错误，请稍后再试。", progress: false });
                break;
        }
    }

    codePushDownloadDidProgress(progress) {
        this.setState({ progress });
    }

    toggleAllowRestart() {
        this.state.restartAllowed
            ? codePush.disallowRestart()
            : codePush.allowRestart();

        this.setState({ restartAllowed: !this.state.restartAllowed });
    }

    getUpdateMetadata() {
        codePush.getUpdateMetadata(codePush.UpdateState.RUNNING)
            .then((metadata: LocalPackage) => {
                this.setState({ syncMessage: metadata ? JSON.stringify(metadata) : "Running binary version", progress: false });
            }, (error: any) => {
                this.setState({ syncMessage: "Error: " + error, progress: false });
            });
    }

    /** Update is downloaded silently, and applied on restart (recommended)后台更新，静默方法 */
    sync() {
        codePush.sync(
            {},
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this)
        );
    }

    /** Update pops a confirmation dialog, and then immediately reboots the app */
    syncImmediate() {
        codePush.sync({
                installMode: codePush.InstallMode.IMMEDIATE,
                updateDialog: {
                    appendReleaseDescription: true,
                    title: '应用可更新',
                    descriptionPrefix:'更新内容：',
                    optionalUpdateMessage:'发现可用的更新，您确定现在安装更新吗？',
                    optionalIgnoreButtonLabel:'稍后',
                    mandatoryContinueButtonLabel: '继续',
                    mandatoryUpdateMessage: '有更新请您务必安装。',
                    optionalInstallButtonLabel:'立即更新',
                }
            },
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this),
        );
    }
    render() {
        return (
            <View style={{backgroundColor:'#E3E7F3'}}>
                <View style={{margin:30, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../../resource/logo_1.png')} style={{width:80, height:80,}}/>
                    <Text style={{marginTop:10,}}>{config.appName}</Text>
                </View>
                <Item bordered icon="ios-information-circle" iconStyle={{color:'#00859c'}} goToPage={()=>this.goToPage('Web', {url: urls.webPath+'/yzb/about', title:'关于养殖宝'})} text="关于我们"/>
                <Item bordered icon="ios-compass" iconStyle={{color:'#00d487'}} goToPage={()=>this.goToPage('Web', {url: urls.webPath+'/yzb/about/contact', title:'联系养殖宝'})} text="联系我们"/>
                <Item icon="ios-checkmark-circle" iconStyle={{color:'orange'}} goToPage={()=>this.goToPage('Web', {url: urls.webPath+'/yzb/about/protocol', title:'用户协议'})} text="用户协议"/>
                <SeparatorArea style={{height: 15}}/>
                <Item icon="ios-cloud-download" iconStyle={{color:'#777'}} goToPage={()=>this.syncImmediate()} text="检查更新" subtext={config.versionName} bordered/>
            </View>
        )
    }
}

let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };
About = codePush(codePushOptions)(About);