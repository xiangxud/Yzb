import React, {Component} from 'react';
import
{
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableNativeFeedback
} from 'react-native';
import {observer} from 'mobx-react/native';
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx';
import { Icon } from 'native-base'

@observer
export default class Waring extends Component{
    constructor(props){
        super(props);
    }
    empty = (e) =>{
        return !e || e==null || e=="";
    };
    humidityWaring = (humidity)=>{
        if( !this.empty(humidity) ){
            return (<View style={style.item}><Text>湿度高</Text><Text style={style.red}>{humidity}</Text></View>);
        }
    };
    temperatureWaring = (temperature)=>{
        if( !this.empty(temperature) ){
            return (<View style={style.item}><Text>温度高</Text><Text style={style.red}>{temperature}</Text></View>);
        }
    };
    co2Waring = (co2)=>{
        if( !this.empty(co2) ){
            return (<View style={style.item}><Text>二氧化碳</Text><Text style={style.red}>{co2}</Text></View>);
        }
    };
    otherWaring =(humidity,temperature,co2)=>{
        if(this.empty(humidity) && this.empty(temperature) && this.empty(co2)){
            return (
                <Text>温度、湿度、二氧化碳均未见异常</Text>
            );
        }else if(this.empty(temperature) && this.empty(humidity) ){
            return (
                <Text>温度、湿度未见异常</Text>
            );
        }else if(this.empty(humidity) && this.empty(co2) ){
            return (
                <Text>湿度、二氧化碳未见异常</Text>
            );
        }else if(this.empty(temperature) && this.empty(co2) ){
            return (
                <Text>温度、二氧化碳未见异常</Text>
            );
        }else if(this.empty(humidity) ){
            return (
                <Text>湿度未见异常</Text>
            );
        }else if(this.empty(temperature) ){
            return (
                <Text>温度未见异常</Text>
            );
        }else if(this.empty(co2) ){
            return (
                <Text>二氧化碳未见异常</Text>
            );
        }
    };

    render(){
        const{ waring }= this.props;
        return <View style={style.container}>
            <Text>{waring.genus}{waring.count},</Text>
            {this.humidityWaring(waring.humidity)}
            {this.temperatureWaring(waring.temperature)}
            {this.co2Waring(waring.co2)}
            {this.otherWaring(waring.humidity,waring.temperature,waring.co2)}
        </View>
    }
};

const style = StyleSheet.create({
    container:{
        height:30,
        flexDirection:'row',
        alignItems:'center',
    },
    item:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:5,
    },
    red:{
        color:'#e51c23',
        fontSize:18,
    }
});