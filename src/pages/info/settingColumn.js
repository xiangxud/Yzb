import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';
import { Container, Header, Content, Form,Separator,Icon,Root,ListItem,Text,Toast} from 'native-base';
import {observer,inject} from 'mobx-react/native';
import FootBar from '../../components/sty/FootBar'
import TransferStyInput from '../../components/sty/TransferStyInput'
import {ValidateInput,ValidateInputInt,ValidateInputDate,ValidateChooseItem,ReadOnlyInput} from '../../components/common/native-base-validate'
import CustomTab from './customTab'
import tools from "../../common/tools";

@inject('userStore')
export default class SettingColumn extends Component{
    static navigationOptions = ({navigation})=>({
        headerTitle: '栏目设置',
        gesturesEnabled:false,
        headerRight: <View />
    });
    constructor(props){
        super(props);
    }
    componentWillMount(){
        const {outPetStore,navigation,userStore} = this.props;


        this.items=userStore.ContentLables.extendMap(o => {return {id : o.Id , name: o.Name}});

        this.sourceItems=userStore.AllLabels.extendMap(o => {
            if(this.items.fristOne(t => t.id == o.Id) == null){
                return { id : o.Id , name : o.Name };
            }else{
                return null;
            }
        });
    }
    items = [];
    sourceItems=[];

    buttons=[{title:'取消' ,
        default:false,
        onPress:()=>{
            const {navigation} = this.props;
            navigation.goBack();
        }},{title:'提交' ,
        default:true,
        onPress:()=>{
            const {userStore} = this.props;
            let lables = this.items.extendMap(o=> {return {Id : o.id,Name : o.name,Code:''}});
            userStore.postContentLables(lables,()=>{
                tools.showToast("更新成功");
                this.props.navigation.navigate('InfoTab');
            },ex=>{
                tools.showToast("更新失败");
            });
        }}];
    render(){
        return (
            <Container style={{backgroundColor:'#ffffff'}}>
                    <View style={{flex:1}}>
                        <CustomTab items={this.items} sourceItems={this.sourceItems} style={{flex:1}} />
                    </View>
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