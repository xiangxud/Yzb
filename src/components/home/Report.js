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
import TitleBar from '../common/TitleBar';

export default class Report extends Component {
    constructor(props){
        super(props);
    }
    more = () =>{
        alert('更多');
    }
    render() {
        return (
            <View style={styles.container}>
                <TitleBar icon={'area-chart'}
                          iconColor={'red'}
                          title={'养殖报表'}
                          showMore = {true}
                          onMorePress={()=>{this.more()}} />
                <View style={{flexDirection:'row'}}>
                    <View style={styles.reportItems}>
                        <Text>本月出栏</Text>
                        <Text><Text style={styles.report}>1200</Text>头</Text>
                    </View>
                    <View style={styles.reportItems}>
                        <Text>本月入栏</Text>
                        <Text><Text style={styles.report}>2000</Text>头</Text>
                    </View>
                    <View style={styles.reportItems}>
                        <Text>当前养殖量</Text>
                        <Text><Text style={styles.report}>2040400</Text>头</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={styles.reportItems}>
                        <Text>本月死淘</Text>
                        <Text><Text style={styles.report}>280</Text>头</Text>
                    </View>
                    <View style={styles.reportItems}>
                        <Text>本月免疫量</Text>
                        <Text><Text style={styles.report}>500</Text>头</Text>
                    </View>
                    <View style={styles.reportItems}>
                        <TouchableOpacity style={styles.detail} onPress={()=>{this.more()}}>
                            <Text style={{color:'#fff', fontSize:16}}>查看详情</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

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