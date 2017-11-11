/**
 * Created by TomChow on 17/11/8.
 */
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {observer, inject} from 'mobx-react/native'

//@inject('app')
@observer
export default class Info extends Component {
    render() {
        return (
            <View><Text>养殖头条首页</Text></View>
        )
    }
}