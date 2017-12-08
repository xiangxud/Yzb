/**
 * Created by TomChow on 17/11/28.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Switch,
    TouchableOpacity
} from 'react-native';
import {observer} from 'mobx-react/native'
import { Form, Item, Input, Label, Picker, Icon } from 'native-base';
const Step1 = observer((props)=> {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <Form>
                <Item fixedLabel style={styles.pdR}>
                    <Label>手机号<Text style={styles.required}>*</Text></Label>
                    <Input placeholder="请输入手机号码"
                           maxLength={11}
                           keyboardType={'phone-pad'}
                           value={props.store.data.phoneNo}
                           onChangeText={(text) => props.store.set('phoneNo', text)} />
                </Item>
                <Item fixedLabel onPress={()=> navigation.navigate('ChooseFarm', {})}>
                    <Label>养殖场名称<Text style={styles.required}>*</Text></Label>
                    <Input placeholder="请选择养殖场" editable={false} value={props.store.data.farmName} />
                    <Icon name={'ios-arrow-forward'} style={styles.arrow}/>
                </Item>
                <Item fixedLabel last style={[styles.pdR, {height:50,}]}>
                    <Label>是否药物检测<Text style={styles.required}>*</Text></Label>
                    <Switch onValueChange={()=>props.store.changeDrugTesting()} value={props.store.isDrug}></Switch>
                </Item>
            </Form>
        </View>
    )
})

export default Step1

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        marginBottom:10,
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
    }
});