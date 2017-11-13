/**
 * Created by TomChow on 17/11/12.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
    Image,
    ScrollView
} from 'react-native';
import CommonStyles from '../../styles'
import TitleBar from '../common/TitleBar';

export default class MySties extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TitleBar icon={'bank'} iconColor={'red'} title={'我的栋舍'} />
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1, height:300, backgroundColor:'#efc'}}>
                        <View style={{height:100, backgroundColor:'#fae4ac'}}>

                        </View>
                        <View style={{height:199, backgroundColor:'#f9f3f9', marginTop:1}}>

                        </View>
                    </View>
                    <View style={{width:80, height:300,backgroundColor:'#fed' }}>
                        <View style={{height:2000}}>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                            <Text>第一个栋舍</Text>
                        </View>
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
});