import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react/native';
import {Button, Icon, Text } from 'native-base';
import { WebView} from '../'

const Monitor = observer(({monitor, switchVideo})=>{
    if(!monitor.current){
        return null;
    }
    return (
        <View style={styles.container}>
            <View style={styles.infoBox}>
                <Text style={styles.desc}>
                    当前摄像头：{ monitor.current.Name }
                </Text>
                <TouchableOpacity onPress={()=>switchVideo()}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name={'md-swap'} style={{fontSize: 24, color: 'red'}}/>
                        <Text style={{color: 'white', fontSize: 16}}>切换</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <WebView uri={`${urls.webPath}yzb/monitor/live?url=${monitor.current.Url}`}
                     style={styles.webView}/>
        </View>
    )
});
export default Monitor;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
    },
    infoBox:{
        flexDirection:'row',
        alignItems:'center',
        height:30,
        paddingRight:10,
    },
    desc:{
        flex:1,
        padding:5,
        color:'#ffffff'
    },
    webView: { height: 200 },
});