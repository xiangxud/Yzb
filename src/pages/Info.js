/**
 * Created by TomChow on 17/11/8.
 */
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {observer, inject} from 'mobx-react/native'

//@inject('app')
@observer
export default class Info extends Component {
    static navigationOptions = {
        headerTitle: '新闻中心'
    }
    render() {
        return (
            <View><Text>养殖头条首页</Text></View>
        )
    }
}