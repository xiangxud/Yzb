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

    txtRender(){
        let waring = this.props.waring;
        let empty =(e)=>{
            if(!e || e==null || e==""){
                return true;
            }else {
                return false;
            }
        };
        let humidityWaring = (humidity)=>{
            if( !empty(humidity) ){
                return (<View style={style.item}><Text>湿度高</Text><Text style={style.red}>{humidity}</Text></View>);
            }
        };
        let temperatureWaring = (temperature)=>{
            if( !empty(temperature) ){
                return (<View style={style.item}><Text>温度高</Text><Text style={style.red}>{temperature}</Text></View>);
            }
        };
        let co2Waring = (co2)=>{
            if( !empty(co2) ){
                return (<View style={style.item}><Text>二氧化碳</Text><Text style={style.red}>{co2}</Text></View>);
            }
        };
        let otherWaring=(humidity,temperature,co2)=>{
            if(empty(humidity) && empty(temperature) && empty(co2)){
                return (<View style={style.item}><Text>温度、湿度、二氧化碳均未见异常</Text></View>);
            }else if( empty(temperature) && empty(humidity) ){
                return (<View style={style.item}><Text>温度、湿度未见异常</Text></View>);
            }else if( empty(humidity) && empty(co2) ){
                return (<View style={style.item}><Text>湿度、二氧化碳未见异常</Text></View>);
            }else if( empty(temperature) && empty(co2) ){
                return (<View style={style.item}><Text>温度、二氧化碳未见异常</Text></View>);
            }else if( empty(humidity) ){
                return (<View style={style.item}><Text>湿度未见异常</Text></View>);
            }else if( empty(temperature) ){
                return (<View style={style.item}><Text>温度未见异常</Text></View>);
            }else if( empty(co2) ){
                return (<View style={style.item}><Text>二氧化碳未见异常</Text></View>);
            }
        };
        return (<View style={style.main}>
            <Text style={style.base}>{waring.genus}{waring.count},</Text>
            {humidityWaring(waring.humidity)}
            {temperatureWaring(waring.temperature)}
            {co2Waring(waring.co2)}
            {otherWaring(waring.humidity,waring.temperature,waring.co2)}
        </View>);
    }

    componentWillMount()
    {
    }
    render(){
        let waring = this.props.waring;
        return <View style={style.main}>
            {this.txtRender()}
        </View>
    }
};

const style = StyleSheet.create({
    main:{
        height:30,
        flexDirection:'row',
        alignItems:'center',
    },
    base:{
        flexDirection:'row',
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