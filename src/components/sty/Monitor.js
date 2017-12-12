import React, {Component} from 'react';
import
{
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback,
    Image,
    WebView
} from 'react-native';
import {observer} from 'mobx-react/native';
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx';
import { Icon } from 'native-base'

@observer
export default class Monitor extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.infoBox}>
                    <Text style={styles.desc}>
                        当前摄像头：{this.props.monitor.name}
                    </Text>
                    <Text style={{color:'white'}}>
                        <Icon name={'md-swap'} style={{fontSize:22, color:'red'}}/>
                        切换
                    </Text>
                </View>
                <WebView
                    javaScriptEnabled={true}
                    source={{uri: urls.webPath + 'yzb/monitor/live'}}
                    style={styles.webView}
                    scalesPageToFit={false}
                    scrollEnabled={false}
                    onNavigationStateChange={(page)=> {
                        this.setState({
                            WebViewHeight: parseInt(page.title)
                        })
                    }}
                />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
    },
    infoBox:{
        flexDirection:'row',
        alignItems:'center',
        height:30,
        padding:3,
    },
    desc:{
        flex:1,
        color:'#ffffff'
    },
    webView: { height: 247 },
});