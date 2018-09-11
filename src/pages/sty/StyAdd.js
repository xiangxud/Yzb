import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { Container, Header, Content, Form,Separator,Icon,Root,ListItem,Text,Toast} from 'native-base';
import {observer, inject} from 'mobx-react/native';
import FootBar from '../../components/sty/FootBar';
import {ValidateInput,ValidateInputInt,ValidateInputDate,ValidateChooseItem,ReadOnlyInput} from '../../components/common/native-base-validate'

@inject('addStyStore')
@observer
export default class StyAdd extends Component{
    static navigationOptions = ({navigation})=>({
        headerTitle: '添加栋舍',
        headerRight: <View/>
    });
    constructor(props){
        super(props);
    }
    getGenus(){
        const {addStyStore} = this.props;
        let options = [];
        addStyStore.genus.forEach((o)=>{
            options.push(o.Code);
        });
        return options;
    }

    buttons=[];
    componentWillMount(){
        const {addStyStore,navigation} = this.props;
        //1、初始化数据
        addStyStore.onIni(navigation.state.params.farm);
        //2、底部菜单
        this.buttons.push({
            title:'下一步' ,
            onPress:this.next.bind(this)
        });
    }

    autoClose( callback ){
        setTimeout(()=>{
            Toast.toastInstance._root.closeToast();
            if(callback){
                callback();
            }
        },800);
    }
    onStyPress(data){
        const {navigation} = this.props;
        let { Stys,StyId } = data;
        let list=[];
        Stys.forEach((item)=>{
            list.push({
                code:item.value,
                title:item.title
            });
        });

        navigation.navigate("Sty",{ code : StyId , list : list , farm:navigation.state.params.farm });
    }
    next(){
        const {addStyStore} = this.props;
        let mess = addStyStore.onValidate();
        if(mess.length > 0){
            tools.showToast("数据项存在错误，请更正");
            // Toast.show({
            //     type:'warning',
            //     text: '数据项存在错误，请更正',
            //     position: 'top'
            // });
            //this.autoClose();
            return ;
        }
        addStyStore.onCommit((data)=>{
            tools.showToast("保存成功");
            this.onStyPress(data);
            // Toast.show({
            //     type:'success',
            //     text: '保存成功',
            //     position: 'top'
            // })
            // this.autoClose(()=>{
            //     this.onStyPress(data)
            // });
        },(err)=>{
            Toast.show({
                type:'danger',
                text: '产生错误:'+err,
                position: 'top'
            })
            this.autoClose();
        });
    }
    onUpdateData(u){
        const {addStyStore} = this.props;
        addStyStore.onChangedSty(u);
    }
    render(){
        const {addStyStore} = this.props;
        return (
            <Container style={{backgroundColor:'#ffffff'}}>
                <Content>
                <Form>
                    <ListItem itemDivider>
                        <Icon style={style.titleIco} name="ios-book" active></Icon><Text>第1步.添加一个栋舍</Text>
                    </ListItem>
                    <ReadOnlyInput label="养殖场" value={addStyStore.farm.Name} />
                    <ValidateInput label="栋舍栏位" data={addStyStore.data} name="name" placeholder="请输入栋舍栏位" IsValidate={addStyStore.IsValidate} onChange={(e)=>{this.onUpdateData({name:e})}} />
                    <ValidateChooseItem label="种属" data={addStyStore.data} name="genus" IsValidate={addStyStore.IsValidate} getOptions={this.getGenus.bind(this)} optionslabel="请选择种属" placeholder="请选择" onChange={(e)=>{this.onUpdateData({genus:e})}} />
                    <ValidateInputInt label="当前日龄" data={addStyStore.data} name="day" placeholder="如 20" IsValidate={addStyStore.IsValidate} onChange={(e)=>{this.onUpdateData({day:e})}} />
                    <ValidateInput label="入栏批次" data={addStyStore.data} name="batchNumber" placeholder="动物批次" onChange={(e)=>{this.onUpdateData({batchNumber:e})}} />
                    <ValidateInputInt label="进栏数量" data={addStyStore.data} name="number" placeholder="进栏数量" IsValidate={addStyStore.IsValidate} onChange={(e)=>{this.onUpdateData({number:e})}} />
                    <ValidateInputDate label="进栏日期" data={addStyStore.data} name="addDate" placeholder="进栏日期" IsValidate={addStyStore.IsValidate} onChange={(e)=>{this.onUpdateData({addDate:e})}} />
                    <ValidateInput label="设备号" data={addStyStore.data} name="equNum" IsValidate={addStyStore.IsValidate} placeholder="请输入物联网设备号" onChange={(e)=>{this.onUpdateData({equNum:e})}} />
                </Form>
                </Content>
                <FootBar buttons={this.buttons}></FootBar>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    titleIco:{
        color:'#009688',
        paddingRight:5
    }
});