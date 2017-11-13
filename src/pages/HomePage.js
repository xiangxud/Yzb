/**
 * Created by TomChow on 17/11/8.
 */
import React, { Component } from 'react'
import {
    Text,
    ScrollView,
    View,
    StyleSheet,
    TouchableHighlight,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import CommonStyles from '../styles'
import SwiperBanner from '../components/home/SwiperBanner'
import MySties from '../components/home/MySties'
import Remind from "../components/home/Remind";
import Report from "../components/home/Report";
import Toutiao from "../components/home/Toutiao";

export default class HomePage extends Component {
    render() {
        return (
            <ScrollView style={CommonStyles.container}>
                <View style={{height:120, backgroundColor:'#ffc'}}>
                    <SwiperBanner />
                </View>
                <View style={{marginTop:10, marginBottom:10, backgroundColor:'#fff', height:80, flexDirection:'row'}}>
                    <TouchableHighlight onPress={()=> this.props.navigation.navigate('InfoDetail') } style={styles.homeBigButton}>
                        <View style={styles.homeBigButtonInner}>
                            <Icon name='medkit' color={'#8bc34a'} size={34} />
                            <Text>动物诊疗</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> this.props.navigation.navigate('InfoDetail') } style={styles.homeBigButton}>
                        <View style={styles.homeBigButtonInner}>
                            <Icon name='user-md' color={'#50AAF0'} size={34} />
                            <Text>滴滴兽医</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> this.props.navigation.navigate('InfoDetail') } style={styles.homeBigButton}>
                        <View style={styles.homeBigButtonInner}>
                            <Icon name='video-camera' color={'#F1745E'} size={34} />
                            <Text>直播间</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> {}} style={styles.homeBigButton}>
                        <View style={styles.homeBigButtonInner}>
                            <Icon name='shopping-cart' color={'#888'} size={34} />
                            <Text>商城</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> this.props.navigation.navigate('InfoDetail') } style={styles.homeBigButton}>
                        <View style={styles.homeBigButtonInner}>
                            <Icon name='line-chart' color={'#009688'} size={34} />
                            <Text>行情</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <MySties/>
                <Remind/>
                <Report/>
                <Toutiao/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    homeBigButton:{
        flex: 1,
    },
    homeBigButtonInner:{
        alignItems:'center',
        justifyContent:'center',
        height:80
    }
});