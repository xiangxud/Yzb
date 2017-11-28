import React, {Component} from 'react';
import
{
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback,
    Image
} from 'react-native';
import {observer} from 'mobx-react/native';
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx';
import { Icon } from 'native-base'

const defaultVideo = require('../../resource/video.jpg');

@observer
export default class Monitor extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount()
    {
    }
    render(){
        let bg = this.props.backgroundColor;
        bg={
            backgroundColor:this.props.backgroundColor
        };
        return <View style={[style.main,bg]}>
            <View style={style.toolbar}>
                <Text style={style.txt}>
                    {this.props.monitor.name}
                </Text>
                <Text style={style.txt}>
                    {this.props.monitor.timer}
                </Text>
            </View>
            <View style={style.video}>
                <Image source={defaultVideo} style={style.img}></Image>
            </View>
        </View>
    }
};

const style = StyleSheet.create({
    main:{
        alignItems:'stretch',
    },
    toolbar:{
        flexDirection:'row',
        height:25,
        alignItems:'center',
    },
    txt:{
        color:'#ffffff'
    },
    video:{
        flexDirection:'row',
    },
    img:{
        flex:1
    }
});