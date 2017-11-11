/**
 * Created by TomChow on 17/11/8.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import CommonStyles from '../styles'

export default class HomePage extends Component {
    render() {
        return (
            <View style={[CommonStyles.container, styles.container]}>
                <TouchableHighlight onPress={()=> this.props.navigation.navigate('InfoDetail') }>
                    <Text>
                        跳转到新闻详情
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    welcome: {
        textAlign: 'center',
        margin: 10,
        marginTop: 100
    },
    text: {
        textAlign: 'center',
        margin: 10,
    },
    textRed: {
        color: 'red',
    },
});