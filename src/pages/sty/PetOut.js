import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';
import { Container, Header, Content, Form,Separator,Icon,Root,ListItem,Text,Toast} from 'native-base';
import {observer,inject} from 'mobx-react/native';
import FootBar from '../../components/sty/FootBar'
import TransferStyInput from '../../components/sty/TransferStyInput'
import {ValidateInput,ValidateInputInt,ValidateInputDate,ValidateChooseItem,ReadOnlyInput} from '../../components/common/native-base-validate'

@inject('outPetStore')
@observer
export default class PetOut extends Component{
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

        let renderItem=(o,key)=>{
            if( outPetStore.showBatch || !o.Transfer){
                return <ValidateInputInt key={key}
                                         label={o.title}
                                         data={outPetStore.data.Collection}
                                         name={o.key}
                                         placeholder="如 20"
                                         onChange={(e)=> {
                                             outPetStore.onUpdateCollection(o.key,e)
                                         }} />;
            }else{
                return null;
            }
        };
        return members.map(renderItem);
    }

    onCommit(){
        const {outPetStore} = this.props;
        let mess = outPetStore.onValidate();
        if(mess.length > 0){
            Toast.show({
                type:'warning',
                text: '数据项存在错误，请更正',
                position: 'top'
            });
            this.autoClose();
            return;
        }

        outPetStore.onComiit((data)=>{
            Toast.show({
                type:'success',
                text: '出栏成功',
                position: 'top'
            });
            this.autoClose(()=>{
                const {navigation} = this.props;
                let { Id } = data;
                navigation.navigate("Sty",{ code : Id , list : [] , farm:navigation.state.params.farm });
            });
        },(err)=>{
            Toast.show({
                type:'warning',
                text: '出栏失败:' + err,
                position: 'top'
            });
            this.autoClose();
        })
    }
    autoClose( callback ){
        setTimeout(()=>{
            Toast.toastInstance._root.closeToast();
            if(callback){
                callback();
            }
        },2000);
    }

    renderBatch(){
        const {outPetStore} = this.props;
        if(outPetStore.showBatch) {
            return <ValidateChooseItem label="动物批次" data={outPetStore.data} name="BatchNumber" selectOptions={outPetStore.batchsOptions} optionslabel="动物批次" placeholder="请选择动物批次" onChange={(e)=>{outPetStore.onUpdate({BatchNumber:e})}} />
        }else{
            return null;
        }
    }
    buttons=[{title:'取消' ,
        default:false,
        onPress:()=>{
            const {navigation} = this.props;
            navigation.goBack();
        }},{title:'提交' ,
        default:true,
        onPress:()=>{
            this.onCommit()
        }}];
    render(){
        const {outPetStore} = this.props;
        return (
            <Container style={{backgroundColor:'#ffffff'}}>
                <Content>
                    <Form>
                        <ListItem itemDivider>
                            <Icon style={style.titleIco} name="ios-book" active></Icon><Text>{outPetStore.styName}出栏</Text>
                        </ListItem>
                        {
                            this.renderBatch()
                        }
                        <ValidateInputInt label="日龄" data={outPetStore.data} name="Day"  IsValidate={outPetStore.IsValidate} placeholder="如 20" onChange={(e)=>{outPetStore.onUpdate({Day:e})}} />
                        {
                            this.renderOutNumber()
                        }
                        <ValidateInputDate label="出栏日期" data={outPetStore.data} name="OutDate" IsValidate={outPetStore.IsValidate} placeholder="出栏日期" onChange={(e)=>{outPetStore.onUpdate({OutDate:e})}} />
                        <TransferStyInput show={outPetStore.showTransferSty} label="转移到" data={outPetStore.data} IsValidate={outPetStore.IsValidate} options={outPetStore.otherStyOptions} name="TransferStyName" placeholder="转移到的栋舍" onChanged={(e)=>{outPetStore.onUpdate({TransferSty:e.value,TransferStyName:e.text})}} />
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