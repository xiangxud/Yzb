import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Content, Form,Separator,Icon,Root,ListItem,Text,Toast} from 'native-base';
import {observer,inject} from 'mobx-react/native';
import FootBar from '../../components/sty/FootBar'
import {ValidateInput,ValidateInputDate,ValidateChooseItem,ReadOnlyInput} from '../../components/common/native-base-validate'

@inject('addStyStore')
@observer
export default class Add extends Component{
    static navigationOptions = ({navigation})=>({
        headerTitle: '添加栋舍',
    });
    constructor(props){
        super(props);
    }
    getGenus(){
        const {addStyStore} = this.props;
        let options = [];
        debugger;
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

    next(){
        this.onUpdateData({ submited:true });
        const {addStyStore} = this.props;
        if(!addStyStore.sty.isValid){
            Toast.show({
                text: '数据项存在错误，请更正',
                position: 'bottom',
                buttonText: '确定'
            });
        }
    }
    onUpdateData(u){
        const {addStyStore} = this.props;
        addStyStore.onChangedSty(u);
    }
    render(){
        const {addStyStore} = this.props;
        return (
            <Root>
            <Container style={{backgroundColor:'#ffffff'}}>
                <Content>
                    <ListItem itemDivider>
                        <Icon style={style.titleIco} name="ios-book" active></Icon><Text>第1步.添加一个栋舍</Text>
                    </ListItem>
                    <ReadOnlyInput label="养殖场" value={addStyStore.farm.Name} />
                    <ValidateInput label="栋舍栏位" data={addStyStore.sty} name="name" placeholder="请输入栋舍栏位" onChange={(e)=>{this.onUpdateData({name:e})}} />
                    <ValidateChooseItem label="种属" data={addStyStore.sty} name="genus" getOptions={this.getGenus.bind(this)} optionslabel="请选择种属" placeholder="请选择" onChange={(e)=>{this.onUpdateData({genus:e})}} />
                    <ValidateInput label="当前日龄" data={addStyStore.sty} name="day" placeholder="如 20" onChange={(e)=>{this.onUpdateData({day:e})}} />
                    <ValidateInput label="入栏批次" data={addStyStore.sty} name="batchNumber" placeholder="动物批次" onChange={(e)=>{this.onUpdateData({batchNumber:e})}} />
                    <ValidateInput label="进栏数量" data={addStyStore.sty} name="number" placeholder="进栏数量" onChange={(e)=>{this.onUpdateData({number:e})}} />
                    <ValidateInputDate label="进栏日期" data={addStyStore.sty} name="addDate" placeholder="进栏日期" onChange={(e)=>{this.onUpdateData({addDate:e})}} />
                </Content>
                <FootBar buttons={this.buttons}></FootBar>
            </Container>

            </Root>
        );
    }
}

const style = StyleSheet.create({
    titleIco:{
        color:'#009688',
        paddingRight:5
    }
});