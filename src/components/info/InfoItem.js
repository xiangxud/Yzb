import React, {Component} from 'react'
import {
    Text,
    FlatList,
    View,
    Image,
    StyleSheet,
    TouchableNativeFeedback,
} from 'react-native';

import {observer} from 'mobx-react/native';

const InfoItem = observer(({info, press}) => {
    return <TouchableNativeFeedback onPress={() => press(info)}
                                    background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.newsItem}>
            <Text style={styles.newsItemTitle}>
                {info.title}
            </Text>
            <Text style={styles.summary}>
                {info.summary}
            </Text>
            <Text style={styles.newsItemDesc}>
                {info.copyright} {info.create_date.ToDate().GetLabel()}
            </Text>
        </View>
    </TouchableNativeFeedback>
});

const InfoItemPic = observer(({info, press}) => {
    return <TouchableNativeFeedback onPress={() => press(info)}
                                    background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={[styles.newsItem, {flexDirection:'row'}]}>
            <View style={{flex:1}}>
                <Text style={styles.newsItemTitle}>
                    {info.title}
                </Text>
                <Text style={styles.newsItemDesc}>
                    {info.copyright} {info.create_date.ToDate().GetLabel()}
                </Text>
            </View>
            <View style={{width: 120, height:80, backgroundColor:'white', padding:5,}}>
                <Image source={{uri: info.face_url}} style={{flex:1}} />
            </View>
        </View>
    </TouchableNativeFeedback>
});

const styles = StyleSheet.create({
    newsItem: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc'
    },
    newsItemTitle: {
        fontSize: 20,
        color: 'black'
    },
    news_summary: {
        fontSize: 14,
    },
    newsItemDesc: {
        fontSize: 12, color: '#ccc'
    },
});

export {
    InfoItem,
    InfoItemPic
};