import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    WebView
} from 'react-native';
import {observer} from 'mobx-react/native';
import {Button, Icon, Text } from 'native-base';

const EnvironmentMonitor = observer(({data})=>{
    return (
        <View style={styles.container}>
            <View style={styles.infoBox}>
                <Text style={styles.desc}>温度</Text>
                <Text style={[styles.val, {color:'#18ccc8'}]}>{data.temperature}</Text>
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.desc}>湿度</Text>
                <Text style={[styles.val, {color:'red'}]}>{data.humidity}</Text>
            </View>
            <View style={styles.infoBox}>
                <Text style={styles.desc}>二氧化碳</Text>
                <Text style={styles.val}>{data.o2c}</Text>
            </View>
        </View>
    )
});
export default EnvironmentMonitor;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#e2e2e2',
        backgroundColor:'#fff'
    },
    infoBox:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:20,
    },
    desc:{
        fontSize:14,
        color:'#6f6f6f',
    },
    val: {
        fontSize:24,
        color:'green',
        fontWeight:'bold',
    },
});