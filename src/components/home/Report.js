/**
 * Created by TomChow on 17/11/12.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {observer} from 'mobx-react/native'
import TitleBar from '../common/TitleBar';

const Report = observer(({fields, morePress})=> {
    return (
        <View style={styles.container}>
            <TitleBar icon={'area-chart'}
                      iconColor={'red'}
                      title={'养殖报表'}
                      showMore={true}
                      morePress={() => morePress('report') }/>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.reportItems}>
                    <Text>本月出栏</Text>
                    <Text><Text style={styles.report}>{fields.out}</Text>头</Text>
                </View>
                <View style={styles.reportItems}>
                    <Text>本月入栏</Text>
                    <Text><Text style={styles.report}>{fields.in}</Text>头</Text>
                </View>
                <View style={styles.reportItems}>
                    <Text>当前养殖量</Text>
                    <Text><Text style={styles.report}>{fields.now}</Text>头</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.reportItems}>
                    <Text>本月死淘</Text>
                    <Text><Text style={styles.report}>{fields.dead}</Text>头</Text>
                </View>
                <View style={styles.reportItems}>
                    <Text>本月免疫量</Text>
                    <Text><Text style={styles.report}>{fields.month_imm}</Text>头</Text>
                </View>
                <View style={styles.reportItems}>
                    <TouchableOpacity style={styles.detail} onPress={() => morePress('report')}>
                        <Text style={{color: '#fff', fontSize: 16}}>查看详情</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
})

export default Report

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        marginBottom:10,
    },
    reportItems:{
        flex:1,
        height:70,
        justifyContent:'center',
        alignItems:'center'
    },
    report:{
        fontSize:30,
        fontWeight:'bold',
        color:'red'
    },
    detail:{
        backgroundColor:'#009688',
        padding:10,
    }
});