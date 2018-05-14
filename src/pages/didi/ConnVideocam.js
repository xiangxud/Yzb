/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    Linking,
} from 'react-native';
import {Container, Content} from "../../components";
import {Button, Icon, Text, Footer } from 'native-base';

export default class VetInfo extends Component {
    static navigationOptions = ({navigation})=>({
        headerTitle: '链接视频',
        headerRight: <View></View>
    });

    render() {
        const defaultPhoto = require('../../resource/connVideo.png');
        const codePhoto = require('../../resource/code.png');
        return (
            <Container>
                <Content gray>
                    <View style={styles.loaddingContainer}>
                        <Text>正在连接智能头盔...</Text>
                    </View>
                    <View style={styles.cardContainer}>
                        <Image source={defaultPhoto} style={styles.img} resizeMode="contain" ></Image>
                        <Image source={codePhoto} style={styles.codeImg} resizeMode="contain" ></Image>
                    </View>
                    <Button block success full onPress={()=>{ alert("正在建设中...") }}>
                        <Text>我要购买智能头盔</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    loaddingContainer: {
        height:50,
        alignItems:'center',
        justifyContent:'center',
    },
    cardContainer: {
        alignItems:'center',
        justifyContent:'space-around',
        alignContent:'center',
        flex:1
    },
    content: {
        alignItems:'center',
        justifyContent:'center',
        flex:2,
    },
    img:{
        width:width - 200,
    },
    codeImg:{
        width:width - 200,
    },
    connSty:{

    }
});