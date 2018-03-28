/**
 * Created by TomChow on 17/11/12.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    Dimensions
} from 'react-native';
import {observer} from 'mobx-react/native'
import Swiper from 'react-native-swiper';
var {height, width} = Dimensions.get('window');

const SwiperBanner = observer(({ds, onItemsPress})=> {
        return (
            <Swiper style={styles.wrapper}
                    showsButtons={false}
                    paginationStyle={styles.paginationStyle}
                    activeDotColor={'#009688'}
                    autoplay={true}>
                {ds.map((item, i)=>
                <TouchableWithoutFeedback key={i} onPress={e => onItemsPress(item)} style={styles.slide}>
                    <Image source={{uri: item.img}} style={{width: width, height:120,}} />
                </TouchableWithoutFeedback>
                )}
            </Swiper>
        )
});

export default SwiperBanner;

const styles = StyleSheet.create({
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    paginationStyle:{
        bottom:5
    }
});