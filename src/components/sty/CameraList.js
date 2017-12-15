
import React, {Component} from 'react';
import
{
    TouchableOpacity,
    TouchableHighlight, StyleSheet,View
} from 'react-native';
import { Form, Label,ListItem,Item,Left,Right,Text,Radio,Icon } from 'native-base';
import {observer} from "mobx-react/native";

const CameraList = observer(function CameraList({list,defaultId,onChanged,onModify,onRemove,...props}){
    let _render=(item) =>
    {
        let icon= item.data.Id==defaultId?"md-radio-button-on":"md-radio-button-off";
        let checkStyle = item.data.Id==defaultId?[style.atxt,style.default]:[style.atxt];

        debugger

        return <View key={item.data.Id} style={style.border}>
            <View style={style.row}>
                <Label numberOfLines={1} style={style.label}>{item.data.Name}</Label>
            </View>
            <View style={style.row}>
                <TouchableOpacity onPress={()=>{onChanged(item.data.Id)}}>
                    <View style={style.left}>
                        <Icon style={[...checkStyle,style.ico]} name={icon} />
                        <Label style={checkStyle}>设置默认</Label>
                    </View>
                </TouchableOpacity>
                <View style={style.action}>
                    <TouchableOpacity style={style.action} onPress={()=>onRemove(item.data.Id)}>
                        <Icon name="ios-trash-outline" />
                        <Label style={style.atxt}>删除</Label>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={()=>onModify(item)}>
                        <Icon name="ios-create-outline" />
                        <Label style={style.atxt}>修改</Label>
                    </TouchableOpacity>
                </View>
            </View>
        </View>};
    return (
        <Form style={style.main}>
            {
                list.map((item)=>(_render(item)))
            }
        </Form>);
});

const style = StyleSheet.create({
    main:{
        backgroundColor:'#ffffff',
    },
    border:{
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#ccc',
        paddingLeft:10,
        paddingRight:10
    },
    row:{
        paddingTop:5,
        paddingBottom:5,
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between'
    },
    left:{
        flexDirection:'row',
        alignContent:'center'
    },
    label:{
        textAlignVertical:'center'
    },
    atxt:{
        marginLeft:5,
        fontSize:15,
        color:'#bbbbbb',
        textAlignVertical:'center'
    },
    ico:{
        fontSize:24
    },
    default:{
        color:'#009688',
        fontSize:16,
    },
    actions:{
        flexDirection:'row'
    },
    action:{
        flexDirection:'row',
        marginLeft:10
    }
});
export default CameraList;