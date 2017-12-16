import React, {Component} from "react";
import {
    Image,
    Alert
} from 'react-native';
import {Body, Icon, Left, ListItem, Right, Text, View} from "native-base";
import {SeparatorArea} from "../../components";
import CodePush from "react-native-code-push";

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
                <Text>{props.subtext?props.subtext: null}</Text>
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
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                this.setState({ syncMessage: "Checking for update." });
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                this.setState({ syncMessage: "Downloading package." });
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                this.setState({ syncMessage: "Awaiting user action." });
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                this.setState({ syncMessage: "Installing update." });
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                this.setState({ syncMessage: "App up to date.", progress: false });
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                this.setState({ syncMessage: "Update cancelled by user.", progress: false });
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                this.setState({ syncMessage: "Update installed and will be applied on restart.", progress: false });
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                this.setState({ syncMessage: "An unknown error occurred.", progress: false });
                break;
        }
    }

    codePushDownloadDidProgress(progress) {
        this.setState({ progress });
    }

    toggleAllowRestart() {
        this.state.restartAllowed
            ? CodePush.disallowRestart()
            : CodePush.allowRestart();

        this.setState({ restartAllowed: !this.state.restartAllowed });
    }

    getUpdateMetadata() {
        CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
            .then((metadata: LocalPackage) => {
                this.setState({ syncMessage: metadata ? JSON.stringify(metadata) : "Running binary version", progress: false });
            }, (error: any) => {
                this.setState({ syncMessage: "Error: " + error, progress: false });
            });
    }

    /** Update is downloaded silently, and applied on restart (recommended)后台更新，静默方法 */
    sync() {
        CodePush.sync(
            {},
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this)
        );
    }

    /** Update pops a confirmation dialog, and then immediately reboots the app */
    syncImmediate() {
        CodePush.sync({ installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
            this.codePushStatusDidChange.bind(this),
            this.codePushDownloadDidProgress.bind(this)
        );
    }
    render() {
        return (
            <View style={{backgroundColor:'#E3E7F3'}}>
                <View style={{margin:30, justifyContent:'center', alignItems:'center'}}>
                    <Image source={require('../../resource/logo_1.png')} style={{width:80, height:80,}}/>
                    <Text style={{marginTop:10,}}>养殖宝</Text>
                </View>
                <Item bordered icon="ios-information-circle" iconStyle={{color:'#00859c'}} goToPage={()=>this.goToPage('Web', {url: urls.webPath+'/yzb/about', title:'关于养殖宝'})} text="关于我们"/>
                <Item bordered icon="ios-compass" iconStyle={{color:'#00d487'}} goToPage={()=>this.goToPage('Web', {url: urls.webPath+'/yzb/about/contact', title:'联系养殖宝'})} text="联系我们"/>
                <Item icon="ios-checkmark-circle" iconStyle={{color:'orange'}} goToPage={()=>this.goToPage('Web', {url: urls.webPath+'/yzb/about/protocol', title:'用户协议'})} text="用户协议"/>
                <SeparatorArea style={{height: 15}}/>
                <Item icon="ios-cloud-download" iconStyle={{color:'#777'}} goToPage={()=>this.syncImmediate()} text="检查更新" subtext='V2.1' bordered/>
            </View>
        )
    }
}

let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };
About = CodePush(codePushOptions)(About);