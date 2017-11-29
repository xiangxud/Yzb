/**
 * Created by TomChow on 17/11/28.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

import {observer} from 'mobx-react/native'

const StepBar = observer(({current})=> {
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <View style={styles.no}>
                    <Text style={[styles.noText, current===1? styles.currentNoText: null]}>1</Text>
                </View>
                <View style={styles.no}>
                    <Text style={[styles.noText, current===2? styles.currentNoText: null]}>2</Text>
                </View>
                <View style={styles.no}>
                    <Text style={[styles.noText, current===3? styles.currentNoText: null]}>3</Text>
                </View>
                <View style={styles.no}>
                    <Text style={[styles.noText, current===4? styles.currentNoText: null]}>4</Text>
                </View>
                <View style={styles.no}>
                    <Text style={[styles.noText, current===5? styles.currentNoText: null]}>5</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',}}>
                <View style={styles.no}>
                    <Text style={[styles.desc, current===1? styles.currentDesc: null]}>通用</Text>
                </View>
                <View style={styles.no}>
                    <Text style={[styles.desc, current===2? styles.currentDesc: null]}>饲养信息</Text>
                </View>
                <View style={styles.no}>
                    <Text style={[styles.desc, current===3? styles.currentDesc: null]}>样品及检测项目</Text>
                </View>
                <View style={styles.no}>
                    <Text style={[styles.desc, current===4? styles.currentDesc: null]}>疫情及治疗询问</Text>
                </View>
                <View style={styles.no}>
                    <Text style={[styles.desc, current===5? styles.currentDesc: null]}>审批信息</Text>
                </View>
            </View>
        </View>
    )
})

export default StepBar

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        paddingTop:10,
        paddingBottom:10,
        marginBottom:15
    },
    no:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    noText:{
        backgroundColor:'#cccccc',
        color:'#8b8b8b',
        width:20,
        height:20,
        borderRadius:10,
        textAlign:'center',
        fontSize:16,
    },
    desc:{
        width:50,
        color:'#cccccc',
        textAlign:'center'
    },
    currentNoText:{
        backgroundColor:'#15856e',
        color:'#fff'
    },
    currentDesc:{
        color:'#000'
    }
});