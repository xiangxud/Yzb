/**
 * Created by TomChow on 17/11/8.
 */
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {observer, inject} from 'mobx-react/native'

@observer
export default class InfoDetail extends Component {
    render() {
        return (
            <View><Text>新闻详情...</Text></View>
        )
    }
}