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

const Selector = observer(({placeholder, value, onPress})=> {
    return (
        <TouchableOpacity onPress={()=>onPress()} style={{flexDirection:'row', justifyContent:'center', flex:2, marginLeft:4, marginRight:4, marginTop:12, marginBottom:12,}}>
            <Text style={{flex:1, fontSize:18, color:'black'}}>
                {
                    value? value :
                    <Text style={{color:'#8b8b8b'}}>{placeholder}</Text>
                }
            </Text>
            <Icon name={'ios-arrow-forward'} style={{fontSize:22, color:'#ccc'}}/>
        </TouchableOpacity>
    )
})

export default Selector

const styles = StyleSheet.create({

});