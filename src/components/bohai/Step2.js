/**
 * Created by TomChow on 17/11/28.
 */
import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Switch,
    Modal,
    TouchableOpacity
} from 'react-native';
import {observer} from 'mobx-react/native'
import { List, ListItem, Form, Item, Input, Label, Picker, Icon, Button } from 'native-base';

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
                           value={props.store.data.poultryTotalCount.toString()}
                           onChangeText={(text) => props.store.set('poultryTotalCount', text)} />
                </Item>

                <Item fixedLabel style={styles.pdR}>
                    <Label>单舍养殖量<Text style={styles.required}>*</Text></Label>
                    <Input placeholder="单舍养殖量"
                           maxLength={8}
                           keyboardType={'numeric'}
                           value={props.store.data.poultrySingleCount.toString()}
                           onChangeText={(text) => props.store.set('poultrySingleCount', text)} />
                </Item>
                <Item fixedLabel style={styles.pdR}>
                    <Label>公司养殖量<Text style={styles.required}>*</Text></Label>
                    <Input placeholder="公司养殖量/月"
                           maxLength={8}
                           keyboardType={'numeric'}
                           value={props.store.data.poultryMonthCount.toString()}
                           onChangeText={(text) => props.store.set('poultryMonthCount', text)} />
                </Item>
                <Item fixedLabel onPress={()=> props.store.switchBreedsModal()}>
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
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={props.store.modalBreedsVisible}
                onRequestClose={() => {alert("Modal has been closed.")}}
            >
                <View style={{marginTop: 22}}>
                    <View>
                        <Text>选择饲养品种</Text>
                        <List>
                            <ListItem onPress={()=>props.store.chooseBreeds('s1')}>
                                <Text>Simon Mignolet</Text>
                            </ListItem>
                            <ListItem onPress={()=>props.store.chooseBreeds('s2')}>
                                <Text>Nathaniel Clyne</Text>
                            </ListItem>
                            <ListItem onPress={()=>props.store.chooseBreeds('s3')}>
                                <Text>Dejan Lovren</Text>
                            </ListItem>
                        </List>
                        <TouchableOpacity onPress={() =>
                            props.store.switchBreedsModal()
                        }>
                            <Text>Hide Modal</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
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