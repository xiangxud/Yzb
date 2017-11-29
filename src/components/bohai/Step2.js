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

const Step2 = observer((props)=> {
    const { navigation } = props;
    return (
        <View style={styles.container}>
            <Form>
                <Item fixedLabel style={styles.pdR}>
                    <Label>全场养殖量<Text style={styles.required}>*</Text></Label>
                    <Input placeholder="全场养殖量"
                           maxLength={8}
                           keyboardType={'numeric'}
                           onChangeText={(text) => props.store.set('poultryTotalCount', text)} />
                </Item>

                <Item fixedLabel style={styles.pdR}>
                    <Label>单舍养殖量<Text style={styles.required}>*</Text></Label>
                    <Input placeholder="单舍养殖量"
                           maxLength={8}
                           keyboardType={'numeric'}
                           onChangeText={(text) => props.store.set('poultrySingleCount', text)} />
                </Item>
                <Item fixedLabel style={styles.pdR}>
                    <Label>公司养殖量<Text style={styles.required}>*</Text></Label>
                    <Input placeholder="公司养殖量/月"
                           maxLength={8}
                           keyboardType={'numeric'}
                           onChangeText={(text) => props.store.set('poultryMonthCount', text)} />
                </Item>
                <Item fixedLabel onPress={()=> navigation.navigate('ChooseFarm', {})}>
                    <Label>饲养品种<Text style={styles.required}>*</Text></Label>
                    <Input placeholder="饲养品种" editable={false} value={props.store.poultryBreeds} />
                    <Icon name={'ios-arrow-forward'} style={styles.arrow}/>
                </Item>
                <Item fixedLabel last onPress={()=> navigation.navigate('ChooseFarm', {})}>
                    <Label>送检代次<Text style={styles.required}>*</Text></Label>
                    <Input placeholder="送检代次" editable={false} value={props.store.data.poultryGenerations} />
                    <Icon name={'ios-arrow-forward'} style={styles.arrow}/>
                </Item>
            </Form>
        </View>
    )
})

export default Step2

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