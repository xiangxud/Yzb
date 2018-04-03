/**
 * Created by TomChow on 18/03/30.
 */
import React, {Component} from 'react'
import {
    ScrollView,
    View,
    StyleSheet,
    Alert,
} from 'react-native'
import {Container, Content, Footer, FooterTab, Button, List, ListItem, Form, Text, Item, Label, Input, Icon, Right, ActionSheet} from 'native-base';
import {action, computed, observable, reaction, runInAction, useStrict} from 'mobx'
import {observer, inject} from 'mobx-react/native';
import {MaskLoading} from '../../../components';
import FootBar from '../../../components/sty/FootBar';
import {ValidateInput, ValidateChooseItem, ValidateChooseItemEx} from '../../../components/common/native-base-validate'

@inject('addFarmStore')
@observer
export default class AddFarm extends Component {
    constructor(props){
        super(props);
    }
    static navigationOptions = ({navigation})=>({
        headerTitle: '养殖场信息',
        headerRight: <View/>
    });

    buttons=[];
    componentWillMount () {
        const {addFarmStore, navigation} = this.props;
        //1、初始化数据
        addFarmStore.onIni();
        //2、底部菜单
        this.buttons.push({
            title:'保存养殖场' ,
            onPress: this.savePress.bind(this)
        });
    }

    componentWillUnmount(){
        //this.timer && clearTimeout(this.timer);
    }
    getProvinces = () =>{
        const {addFarmStore} = this.props;
        let options = [];
        addFarmStore.params.provinces.forEach((o)=>{
            options.push(o.p);
        });
        return options;
    }
    getCities =()=>{
        const {addFarmStore} = this.props;
        let cities = [];
        addFarmStore.params.provinces.forEach((o)=>{
            if(o.p===addFarmStore.data.province) {
                o.c.forEach((city)=>{
                    cities.push(city.n);
                });
            }
        });
        return cities;
    }
    getSales = () =>{
        const {addFarmStore} = this.props;
        let options = [];
        addFarmStore.params.sales.forEach((o)=>{
            options.push({text: o.realName, value: o.id});
        });
        return options;
    }

    savePress(){
        const {addFarmStore, navigation} = this.props;
        let mess = addFarmStore.onValidate();
        if(mess.length > 0){
            tools.showToast('数据项存在错误，请更正');
            return ;
        }
        addFarmStore.onCommit((data)=>{
            tools.showToast('保存成功');
            navigation.goBack();
        },(err)=>{
            tools.showToast('产生错误:'+err);
        });
    }
    onUpdateData(u){
        const {addFarmStore} = this.props;
        addFarmStore.onChangedData(u);
    }
    render() {
        const {addFarmStore} = this.props;
        return (
            <Container>
                <MaskLoading show={addFarmStore.isFetching}/>
                <Content>
                    <Form>
                        <ValidateInput label="养殖场名称" data={addFarmStore.data} name="farmName" placeholder="请输入养殖场名称" IsValidate={addFarmStore.IsValidate} onChange={(txt)=>{this.onUpdateData({farmName: txt})}} />
                        <ValidateInput label="养殖场联系人" data={addFarmStore.data} name="contactPerson" placeholder="请输入养殖场联系人" IsValidate={addFarmStore.IsValidate} onChange={(txt)=>{this.onUpdateData({contactPerson: txt})}} />
                        <ValidateInput label="联系方式" data={addFarmStore.data} name="contactPhone" placeholder="请输入联系方式" IsValidate={addFarmStore.IsValidate} onChange={(txt)=>{this.onUpdateData({contactPhone: txt})}} />
                        <ValidateInput label="邮箱" data={addFarmStore.data} name="emailNo" placeholder="请输入邮箱" IsValidate={addFarmStore.IsValidate} onChange={(txt)=>{this.onUpdateData({emailNo: txt})}} />
                        <ValidateChooseItem label="所在省" data={addFarmStore.data} name="province" IsValidate={addFarmStore.IsValidate} getOptions={this.getProvinces.bind(this)} optionslabel="请选择省" placeholder="请选择" onChange={(txt)=>{this.onUpdateData({province: txt, city: ''})}} />
                        <ValidateChooseItem label="所在市" data={addFarmStore.data} name="city" IsValidate={addFarmStore.IsValidate} getOptions={this.getCities.bind(this)} optionslabel="请选择市" placeholder="请选择" onChange={(txt)=>{this.onUpdateData({city: txt})}} />
                        <ValidateInput label="详细地址" data={addFarmStore.data} name="address" placeholder="请输详细地址" IsValidate={addFarmStore.IsValidate} onChange={(txt)=>{this.onUpdateData({address: txt})}} />
                        <ValidateChooseItemEx label="销售" data={addFarmStore.data} name="sales" IsValidate={addFarmStore.IsValidate} getOptions={this.getSales.bind(this)} optionslabel="请选择销售" placeholder="请选择" onChange={(o)=>{this.onUpdateData({salesId: o.value, sales: o.text})}} />
                    </Form>
                </Content>
                <FootBar buttons={this.buttons}></FootBar>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    ico:{
        width:28,
        color:'#b1b1b1',
        fontSize:14
    },
    noAccess:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});