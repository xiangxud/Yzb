import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';
import { Container, Header, Content, Form,Separator,Icon,Root,ListItem,Text,Toast} from 'native-base';
import {observer,inject} from 'mobx-react/native';
import FootBar from '../../components/sty/FootBar'
import TransferStyInput from '../../components/sty/TransferStyInput'
import {ValidateInput,ValidateInputInt,ValidateInputDate,ValidateChooseItem,ReadOnlyInput} from '../../components/common/native-base-validate'

@inject('outPetStore')
@observer
export default class OutPet extends Component{
    static navigationOptions = ({navigation})=>({
        headerTitle: '出栏',
        headerRight: <View />
    });
    constructor(props){
        super(props);
    }
    componentWillMount(){
        const {outPetStore,navigation} = this.props;
        outPetStore.onIni({
            styId:navigation.state.params.code,
            title:navigation.state.params.title,
            farm:navigation.state.params.farm
        },(data)=>{
        },(mess)=>{
            Toast.show({
                type:'danger',
                text: '产生错误:'+mess,
                position: 'top'
            })
            this.autoClose();
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

    renderOutNumber(){
        const {outPetStore} = this.props;
        let members=[];
        for(let m in outPetStore.OutPetReasonTypeEum){
            members.push({key:m, title:outPetStore.OutPetReasonTypeEum[m].Label , Transfer:outPetStore.OutPetReasonTypeEum[m].Transfer });
        }
        return members.map((o,key)=> <ValidateInputInt key={key}
                                                       label={o.title}
                                                       data={outPetStore.data.Collection}
                                                       name={o.key}
                                                       placeholder="如 20"
                                                       onChange={(e)=> {
                                                           outPetStore.onUpdateCollection(o.key,e)
                                                           debugger;
                                                       }} /> );
    }


    buttons=[{title:'取消' , default:false, onPress:()=>{}},{title:'提交' , default:true, onPress:()=>{}}];
    render(){

        const {outPetStore} = this.props;

        return (
            <Container style={{backgroundColor:'#ffffff'}}>
                <Content>
                    <Form>
                        <ListItem itemDivider>
                            <Icon style={style.titleIco} name="ios-book" active></Icon><Text>{outPetStore.styName}出栏</Text>
                        </ListItem>
                        <ValidateChooseItem label="动物批次" data={outPetStore.data} name="BatchNumber" selectOptions={outPetStore.batchsOptions} optionslabel="动物批次" placeholder="请选择动物批次" onChange={(e)=>{outPetStore.onUpdate({BatchNumber:e})}} />
                        <ValidateInputInt label="日龄" data={outPetStore.data} name="Day" placeholder="如 20" onChange={(e)=>{outPetStore.onUpdate({Day:e})}} />
{
    this.renderOutNumber()
}
                        <ValidateInputDate label="出栏日期" data={outPetStore.data} name="OutDate" placeholder="出栏日期" onChange={(e)=>{outPetStore.onUpdate({OutDate:e})}} />
                        <TransferStyInput show={outPetStore.showTransferSty} label="转移到" data={outPetStore.data} options={outPetStore.otherStyOptions} name="TransferStyName" placeholder="转移到的栋舍" onChanged={(e)=>{outPetStore.onUpdate({TransferSty:e.value,TransferStyName:e.text})}} />
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