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
    Dimensions
} from 'react-native';
import {observer, inject} from 'mobx-react/native'
import Swiper from 'react-native-swiper';
var {height, width} = Dimensions.get('window');
@inject('homeStore')
@observer
export default class SwiperBanner extends Component {
    render() {
        return (
            <Swiper style={styles.wrapper}
                    showsButtons={false}
                    paginationStyle={{bottom:5}}
                    activeDotColor={'#009688'}
                    autoplay={true}>
                <View style={styles.slide1}>
                    <Image source={require('../../resource/banner_home_1.jpg')} style={{width: width, height:120,}} />
                </View>
                <View style={styles.slide2}>
                    <Image source={require('../../resource/banner_home_2.jpg')} style={{width: width, height:120,}} />
                </View>
                <View style={styles.slide3}>
                    <Image source={require('../../resource/banner_home_3.jpg')} style={{width: width, height:120,}} />
                </View>
            </Swiper>
        )
    }
}

var styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})