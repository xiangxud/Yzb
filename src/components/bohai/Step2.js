/**
 * Created by TomChow on 17/11/28.
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

@observer
class Step2 extends Component {
    render() {
        const { store } = this.props;
        return (
            <View style={styles.container}>
                {
                    store.data.animalType === '家禽' ?
                    <Form>
                        <Item fixedLabel style={styles.pdR}>
                            <Label>全场养殖量<Text style={styles.required}>*</Text></Label>
                            <Input placeholder="全场养殖量"
                                   maxLength={8}
                                   keyboardType={'numeric'}
                                   value={store.data.poultryTotalCount ? store.data.poultryTotalCount.toString() : ''}
                                   onChangeText={(text) => store.set('poultryTotalCount', text)}/>
                        </Item>

                        <Item fixedLabel style={styles.pdR}>
                            <Label>单舍养殖量<Text style={styles.required}>*</Text></Label>
                            <Input placeholder="单舍养殖量"
                                   maxLength={8}
                                   keyboardType={'numeric'}
                                   value={store.data.poultrySingleCount ? store.data.poultrySingleCount.toString() : ''}
                                   onChangeText={(text) => store.set('poultrySingleCount', text)}/>
                        </Item>
                        <Item fixedLabel style={styles.pdR}>
                            <Label>公司养殖量<Text style={styles.required}>*</Text></Label>
                            <Input placeholder="公司养殖量/月"
                                   maxLength={8}
                                   keyboardType={'numeric'}
                                   value={store.data.poultryMonthCount ? store.data.poultryMonthCount.toString() : ''}
                                   onChangeText={(text) => store.set('poultryMonthCount', text)}/>
                        </Item>
                        <Item fixedLabel onPress={() => this.props.openBreed()}>
                            <Label>饲养品种<Text style={styles.required}>*</Text></Label>
                            <Input placeholder="饲养品种" editable={false} value={store.poultryBreeds} multiline={true}/>
                            <Icon name={'ios-arrow-forward'} style={styles.arrow}/>
                        </Item>
                        <Item fixedLabel last onPress={() => this.props.openGender()}>
                            <Label>送检代次<Text style={styles.required}>*</Text></Label>
                            <Input placeholder="送检代次" editable={false} value={store.data.poultryGenerations}/>
                            <Icon name={'ios-arrow-forward'} style={styles.arrow}/>
                        </Item>
                    </Form>
                    :
                    <Form>
                        <Item fixedLabel style={styles.pdR}>
                            <Label>母猪存栏数<Text style={styles.required}>*</Text></Label>
                            <Input placeholder="请输入母猪存栏数"
                                   maxLength={8}
                                   keyboardType={'numeric'}
                                   value={store.data.livestockTotalCount ? store.data.livestockTotalCount.toString() : ''}
                                   onChangeText={(text) => store.set('livestockTotalCount', text)}/>
                        </Item>

                        <Item fixedLabel style={styles.pdR}>
                            <Label>年出栏肥猪数<Text style={styles.required}>*</Text></Label>
                            <Input placeholder="请输入年出栏肥猪数"
                                   maxLength={8}
                                   keyboardType={'numeric'}
                                   value={store.data.livestockYearCount ? store.data.livestockYearCount.toString() : ''}
                                   onChangeText={(text) => store.set('livestockYearCount', text)}/>
                        </Item>
                        <Item fixedLabel onPress={() => this.props.openPigBreed()}>
                            <Label>饲养品种<Text style={styles.required}>*</Text></Label>
                            <Input placeholder="请选择饲养品种" editable={false} value={store.livestockBreeds} multiline={true}/>
                            <Icon name={'ios-arrow-forward'} style={styles.arrow}/>
                        </Item>
                        <Item fixedLabel last onPress={() => this.props.openPigGender()}>
                            <Label>送检猪类别<Text style={styles.required}>*</Text></Label>
                            <Input placeholder="请选择送检猪类别" editable={false} value={store.livestockGenders}/>
                            <Icon name={'ios-arrow-forward'} style={styles.arrow}/>
                        </Item>
                    </Form>
                }
            </View>
        )
    }
}
export default Step2

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
});