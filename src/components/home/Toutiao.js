/**
 * Created by TomChow on 17/11/12.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableNativeFeedback,
    TouchableOpacity
} from 'react-native';
import TitleBar from '../common/TitleBar';

export default class Toutiao extends Component {
    constructor(props){
        super(props);
    }
    more = () =>{
        alert('更多');
    }
    _onPressButton = () =>{
        alert('ok')
    }
    _onPressButton1 = () =>{
        alert('get it.')
    }
    renderRow = () =>{
        return (
        <TouchableNativeFeedback
            onPress={()=>{this._onPressButton()}}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={{justifyContent:'center', padding:10, borderBottomWidth:StyleSheet.hairlineWidth, borderBottomColor:'#ccc'}}>
                <Text style={{fontSize:18}}>
                    中国农业种植产能过剩超亿吨如何迫近4元降回到十年前
                </Text>
                <Text style={{fontSize:12, color:'#ccc'}}>
                    天津网 2小时前 12评论
                </Text>
            </View>
        </TouchableNativeFeedback>)
    }
    render() {
        return (
            <View style={styles.container}>
                <TitleBar icon={'newspaper-o'}
                          iconColor={'red'}
                          title={'养殖头条'}
                          showMore = {true}
                          onMorePress={()=>{this.more()}} />
                {this.renderRow()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        marginBottom:10,
    },
});