/**
 * Created by TomChow on 17/12/1.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Switch,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {observer} from 'mobx-react/native'
import {Container, Content, Header, List, ListItem, Form, Item, Input, Label, Title, Body,
    Picker, Icon, Button, CheckBox, Footer} from 'native-base';

const CheckItem = observer(({store, item, index, chooseBig, chooseSub, choosePart, remove})=>{
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>检测项目{index+1}</Text>
                <TouchableOpacity onPress={()=>remove(item)}>
                    <Icon name={'ios-trash-outline'} style={{fontSize:20, color:'red'}}/>
                </TouchableOpacity>
            </View>
            <Form>
                <Item fixedLabel onPress={() => chooseBig()}>
                    <Label>检测大类<Text style={styles.required}>*</Text></Label>
                    <Input placeholder="请选择检测大类" editable={false} value={item.samplingSystemNo}/>
                    <Icon name={'ios-arrow-forward'} style={styles.arrow}/>
                </Item>

                <Item fixedLabel onPress={() => chooseSub()}>
                    <Label>检测项目<Text style={styles.required}>*</Text></Label>
                    <Input placeholder="请选择检测项目" editable={false} multiline={true} value={item.testTypeName.join(',')}/>
                    <Icon name={'ios-arrow-forward'} style={styles.arrow}/>
                </Item>
                <Item fixedLabel onPress={() => choosePart()}>
                    <Label>检测样品<Text style={styles.required}>*</Text></Label>
                    <Input placeholder="请选择检测部位或样品" editable={false} multiline={true} value={item.testTypeDetailNames.join(',')}/>
                    <Icon name={'ios-arrow-forward'} style={styles.arrow}/>
                </Item>
                <Item fixedLabel style={styles.pdR}>
                    <Label>栋舍/场名</Label>
                    <Input placeholder="请输入栋舍/场名" value={item.farmName} onChangeText={(text) => store.setItem(item, 'farmName', text)}/>
                </Item>
                <Item fixedLabel style={styles.pdR}>
                    <Label>送检日龄</Label>
                    <Input placeholder="请输入送检日龄" value={JSON.stringify(item.sendAge)} onChangeText={(text) => store.setItem(item, 'sendAge', text)}/>
                </Item>
                <Item fixedLabel style={styles.pdR}>
                    <Label>发病日龄</Label>
                    <Input placeholder="请输入发病日龄" value={item.morbidityAge.toString()} onChangeText={(text) => store.setItem(item, 'morbidityAge', text)}/>
                </Item>
                <Item fixedLabel style={styles.pdR} last>
                    <Label>样品数量<Text style={styles.required}>*</Text></Label>
                    <Input placeholder="请输入样品数量" value={item.sendSamplingCount.toString()} onChangeText={(text) => store.setItem(item, 'sendSamplingCount', text)}/>
                </Item>
            </Form>
        </View>
    )
});

export default CheckItem

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        marginBottom:10,
        flex:1,
    },
    required:{
        color:'red',
    },
    pdR:{
        paddingRight:20
    },
    arrow:{
        color:'#ccc',
        fontSize:14,
        width:20
    },
    header:{
        height:40,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:'#a6f9e8',
        alignItems:'center',
        flexDirection:'row',
    },
    headerTitle:{
        fontSize:16,
        flex:1,
    },
});