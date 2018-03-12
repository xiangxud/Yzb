import React, {Component} from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {observer} from 'mobx-react/native';
import {Text} from 'native-base';
import {WebView} from '../../components'

const EnvironmentMonitor = observer(()=>{
    let errRender=e=>{
        return <View>
            <Text>Error:{e}</Text>
        </View>
    };
    let rd = new Date();
    return (
        <View style={styles.container}>
            <WebView
                uri={urls.webPath + 'yzb/monitor/em?rd='+ rd}
                style={{flex:1}}
                startInLoadingState={true}
                onError={(e)=>errRender(e)}
                canBack={false} />
            <View style={styles.reportItems}>
                <Text style={styles.sTitle}>栋舍湿度</Text>
                <Text style={styles.sTitle}>栋舍温度</Text>
                <Text style={styles.sTitle}>二氧化碳浓度</Text>
            </View>
        </View>
    )
});
export default EnvironmentMonitor;

const styles = StyleSheet.create({
    container:{
        height:150,
        alignItems:'stretch',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#e2e2e2',
        backgroundColor:'#fff'
    },
    reportItems:{
        flexDirection:'row',
        height:30,
    },
    sTitle:{
        flex:1,
        textAlign:'center'
    }
});