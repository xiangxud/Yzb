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
import PropTypes from 'prop-types';
import { Form, Item, Input, Label, Icon } from 'native-base';
@observer
class PigRecord extends Component{
    render() {
        const {store, item, index, choosePigStage, remove} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>猪场血清学调查{index + 1}</Text>
                    <TouchableOpacity onPress={() => remove(index)}>
                        <Icon name={'ios-trash-outline'} style={{fontSize: 20, color: 'red'}}/>
                    </TouchableOpacity>
                </View>
                <Form>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>编号<Text style={styles.required}>*</Text></Label>
                        <Input placeholder="请输入编号"
                               value={item.no}
                               maxLength={20}
                               onChangeText={(text) => store.setItem(index, 'no', text, 'pigSerumRecordList')}/>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>耳号</Label>
                        <Input placeholder="请输入耳号"
                               value={item.earNo}
                               maxLength={20}
                               onChangeText={(text) => store.setItem(index, 'earNo', text, 'pigSerumRecordList')}/>
                    </Item>
                    <Item fixedLabel onPress={() => choosePigStage(index)}>
                        <Label>猪阶段<Text style={styles.required}>*</Text></Label>
                        <Input placeholder="请选择猪阶段"
                               editable={false}
                               value={item.pigStage}/>
                        <Icon name={'ios-arrow-forward'} style={styles.arrow}/>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>死产<Text style={styles.required}>*</Text></Label>
                        <View style={styles.radioBox}>
                            <Icon onPress={()=> store.setItem(index, 'stillbirth', '有', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.stillbirth==='有'?'on':'off')} style={styles.on}/><Text>有</Text>
                            <Icon onPress={()=> store.setItem(index, 'stillbirth', '无', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.stillbirth==='无'?'on':'off')} style={[styles.on,{marginLeft:15}]}/><Text>无
                            </Text>
                        </View>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>流产<Text style={styles.required}>*</Text></Label>
                        <View style={styles.radioBox}>
                            <Icon onPress={()=> store.setItem(index, 'abortion', '有', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.abortion==='有'?'on':'off')} style={styles.on}/><Text>有</Text>
                            <Icon onPress={()=> store.setItem(index, 'abortion', '无', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.abortion==='无'?'on':'off')} style={[styles.on,{marginLeft:15}]}/><Text>无
                        </Text>
                        </View>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>干尸<Text style={styles.required}>*</Text></Label>
                        <View style={styles.radioBox}>
                            <Icon onPress={()=> store.setItem(index, 'mummy', '有', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.mummy==='有'?'on':'off')} style={styles.on}/><Text>有</Text>
                            <Icon onPress={()=> store.setItem(index, 'mummy', '无', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.mummy==='无'?'on':'off')} style={[styles.on,{marginLeft:15}]}/><Text>无
                        </Text>
                        </View>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>空杯<Text style={styles.required}>*</Text></Label>
                        <View style={styles.radioBox}>
                            <Icon onPress={()=> store.setItem(index, 'nonpregnant', '有', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.nonpregnant==='有'?'on':'off')} style={styles.on}/><Text>有</Text>
                            <Icon onPress={()=> store.setItem(index, 'nonpregnant', '无', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.nonpregnant==='无'?'on':'off')} style={[styles.on,{marginLeft:15}]}/><Text>无
                        </Text>
                        </View>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>高烧<Text style={styles.required}>*</Text></Label>
                        <View style={styles.radioBox}>
                            <Icon onPress={()=> store.setItem(index, 'highfever', '有', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.highfever==='有'?'on':'off')} style={styles.on}/><Text>有</Text>
                            <Icon onPress={()=> store.setItem(index, 'highfever', '无', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.highfever==='无'?'on':'off')} style={[styles.on,{marginLeft:15}]}/><Text>无
                        </Text>
                        </View>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>呼吸道疾病<Text style={styles.required}>*</Text></Label>
                        <View style={styles.radioBox}>
                            <Icon onPress={()=> store.setItem(index, 'respiratoryDisease', '有', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.respiratoryDisease==='有'?'on':'off')} style={styles.on}/><Text>有</Text>
                            <Icon onPress={()=> store.setItem(index, 'respiratoryDisease', '无', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.respiratoryDisease==='无'?'on':'off')} style={[styles.on,{marginLeft:15}]}/><Text>无
                        </Text>
                        </View>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>神经症状<Text style={styles.required}>*</Text></Label>
                        <View style={styles.radioBox}>
                            <Icon onPress={()=> store.setItem(index, 'nervous', '有', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.nervous==='有'?'on':'off')} style={styles.on}/><Text>有</Text>
                            <Icon onPress={()=> store.setItem(index, 'nervous', '无', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.nervous==='无'?'on':'off')} style={[styles.on,{marginLeft:15}]}/><Text>无
                        </Text>
                        </View>
                    </Item>
                    <Item fixedLabel style={styles.pdR}>
                        <Label>刻板行为<Text style={styles.required}>*</Text></Label>
                        <View style={styles.radioBox}>
                            <Icon onPress={()=> store.setItem(index, 'mechanical', '有', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.mechanical==='有'?'on':'off')} style={styles.on}/><Text>有</Text>
                            <Icon onPress={()=> store.setItem(index, 'mechanical', '无', 'pigSerumRecordList')} name={'ios-radio-button-'+(item.mechanical==='无'?'on':'off')} style={[styles.on,{marginLeft:15}]}/><Text>无
                        </Text>
                        </View>
                    </Item>
                    <Item fixedLabel style={styles.pdR} last>
                        <Label>其他症状<Text style={styles.required}>*</Text></Label>
                        <Input placeholder="请输入其他症状"
                               maxLength={100}
                               multiline={true}
                               value={item.othersymptom}
                               onChangeText={(text) => store.setItem(index, 'othersymptom', text, 'pigSerumRecordList')}/>
                    </Item>
                </Form>
            </View>
        )
    }
};

export default PigRecord

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
    radioBox:{
        flex:2,
        flexDirection:'row',
        alignItems:'center',
        paddingTop:12,
        paddingBottom:12,
    },
    on:{color:'#377cc3'},
    off:{color:'#ccc'},
});