/**
 * Created by TomChow on 17/11/8.
 */
import React, {Component} from 'react'
import {
    View,
} from 'react-native'
import {WebView} from '../components';

export default class Live extends Component {
    static navigationOptions = ({navigation})=>({
        headerTitle: '直播间',
        headerRight: <View/>
    });

    render() {
        return (
            <WebView
                uri={'http://m.ringpu.com/ringpu/html_php/activity/live.html'}
                style={{ flex:1 }}
            />
        )
    }
}