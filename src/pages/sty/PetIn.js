import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';
import { Container, Header, Content, Form,Separator,Icon,Root,ListItem,Text,Toast} from 'native-base';
import {observer,inject} from 'mobx-react/native';
import FootBar from '../../components/sty/FootBar'
import TransferStyInput from '../../components/sty/TransferStyInput'
import {ValidateInput,ValidateInputInt,ValidateInputDate,ValidateChooseItem,ReadOnlyInput} from '../../components/common/native-base-validate'

@inject('inPetStore')
@observer
export default class PetIn extends Component{
    static navigationOptions = ({navigation})=>({
        headerTitle: '入栏',
        headerRight: <View />
    });
    constructor(props){
        super(props);
    }
    componentWillMount(){
        const {inPetStore,navigation} = this.props;
        inPetStore.onIni({
            styId:navigation.state.params.code,
            title:navigation.state.params.title,
            farm:navigation.state.params.farm},()=>{},()=>{});
    }
    autoClose( callback ){
        setTimeout(()=>{
            Toast.toastInstance._root.closeToast();
            if(callback){
                callback();
            }
        },800);
    }
    onCommit(){
        const {inPetStore} = this.props;
        let mess = inPetStore.onValidate();
        if(mess.length > 0){
            Toast.show({
                type:'warning',
                text: '数据项存在错误，请更正',
                position: 'top'
            });
            this.autoClose();
            return;
        }
        inPetStore.onCommit(data=>{
            Toast.show({
                type:'success',
                text: '入栏成功',
                position: 'top'
            });
            this.autoClose(()=>{
                const {navigation} = this.props;
                let { Id } = data;
                navigation.navigate("Sty",{ code : Id , list : [] , farm:navigation.state.params.farm });
            });
        },err=>{
            Toast.show({
                type:'warning',
                text: '入栏失败:' + err,
                position: 'top'
            });
            this.autoClose();
        });
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
        }
    }];

    render(){
        const {inPetStore} = this.props;
        return (
            <Container style={{backgroundColor:'#ffffff'}}>
                <Content>
                    <Form>
                        <ListItem itemDivider>
                            <Icon style={style.titleIco} name="ios-book" active></Icon><Text>{inPetStore.styName}入栏</Text>
                        </ListItem>
                        <ValidateInput label="批号" data={inPetStore.data} name="BatchNumber" placeholder="批号" onChange={(e)=>{inPetStore.onUpdate({BatchNumber:e})}} />
                        <ValidateInputInt label="日龄" data={inPetStore.data} name="Day" IsValidate={inPetStore.IsValidate} placeholder="日龄" onChange={(e)=>{inPetStore.onUpdate({Day:e})}} />
                        <ValidateInputInt label="数量" data={inPetStore.data} name="Number"  IsValidate={inPetStore.IsValidate} placeholder="如 20" onChange={(e)=>{inPetStore.onUpdate({Number:e})}} />
                        <ValidateInputDate label="入栏日期" data={inPetStore.data} name="AddDate" IsValidate={inPetStore.IsValidate} placeholder="入栏日期" onChange={(e)=>{inPetStore.onUpdate({AddDate:e})}} />
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