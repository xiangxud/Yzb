/**
 * Created by TomChow on 18/04/06.
 */
import React, { Component } from 'react'
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {Icon, Text} from 'native-base';
import {observer} from 'mobx-react/native'

const screenW = Dimensions.get('window').width;

const VideoItem = observer(({v, index, navigation}) => {
    return <TouchableOpacity onPress={()=> navigation.navigate('Web', {title: v.Title, url:v.Url})} key={index}>
        <View style={styles.item}>
            <View style={styles.innerView}>
                {
                    (v.FaceUrl && v.FaceUrl!='')?
                    <Image source={{uri: v.FaceUrl}} style={styles.face}/>
                    :
                    <Image source={require('../../resource/live_no_face.jpg')} style={styles.face}/>
                }
                <Icon name={'logo-youtube'} style={styles.play_btn} />
                <Text style={styles.dur}>{v.Duration}</Text>
            </View>
            <Text style={styles.title}>{v.Title}</Text>
        </View>
    </TouchableOpacity>;
});

export default VideoItem

const styles = StyleSheet.create({
    face:{
        width:screenW/2-5,
        height:screenW/2*226/416-3
    },
    item:{
        width:screenW/2,
        //padding:5,
        backgroundColor:'#fff',
        height:screenW/2*226/416+40
    },
    innerView:{
        width:screenW/2,
        //height:screenW/2*226/416,
        // 文字内容居中对齐
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        fontSize:14,
        marginLeft:3,
        marginRight:3,
        color:'#6f6f6f',
        textAlign:'left',
    },
    dur:{
        fontSize:12,
        paddingLeft:3,
        paddingRight:3,
        color:'#fff',
        backgroundColor:'#000',
        textAlign:'right',
        position:'absolute',
        right:2,
        bottom:0,
    },
    play_btn:{position:'absolute', fontSize:40, color:'#fff'}
});