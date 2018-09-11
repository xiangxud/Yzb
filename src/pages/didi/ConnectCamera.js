/**
 * Created by TomChow on 17/11/16.
 */
import React, {Component} from 'react'
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    Dimensions,
} from 'react-native';
import {Container, Content} from "../../components";
import {Button, Icon, Text, Footer} from 'native-base';

const {width, height} = Dimensions.get('window');

export default class ConnectCamera extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: '链接视频',
        headerRight: <View></View>
    });

    render() {
        const defaultPhoto = require('../../resource/connVideo.png');
        const codePhoto = require('../../resource/code.png');
        return (
            <Container>
                <Content gray>
                    <View style={styles.loading}>
                        <Text>正在连接智能头盔...</Text>
                    </View>
                    <View style={styles.card}>
                        <Image source={defaultPhoto} style={styles.img} resizeMode="contain"/>
                        <Image source={codePhoto} style={styles.codeImg} resizeMode="contain"/>
                    </View>
                    <Button block success full onPress={() => {
                        alert("正在建设中...")
                    }}>
                        <Text>我要购买智能头盔</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        alignItems: 'center',
        justifyContent: 'space-around',
        alignContent: 'center',
        flex: 1
    },
    img: {
        width: width - 200,
    },
    codeImg: {
        width: width - 200,
    },
});