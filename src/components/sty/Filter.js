import React, {Component} from 'react';
import
{
    TouchableOpacity,
    StyleSheet,
    View
} from 'react-native';
import { Form,Container,Content,List,ListItem,Left,Body,Right,Text,Icon,Footer,FooterTab,Button} from 'native-base';
import {ValidateInputDate,ValidateRadioInput} from '../../components/common/native-base-validate'
import FootBar from '../sty/FootBar'
import {inject, observer} from "mobx-react/native";

@inject('immFilterStore')
export default class filter extends Component{
    constructor(props){
        super(props);
    }
    onUpdateData(obj){
        let {immFilterStore} = this.props;
        immFilterStore.update(obj);
    }
    render(){
        let {immFilterStore} = this.props;
        let options=[{title:'未执行',value:0},{title:'已执行',value:1},{title:'全部',value:-1}];
        let buttons=[{title:'取消',onPress:()=>{}},{title:'查询',default:true, onPress:()=>{

         }}];
        return (<Container style={{flex:1,backgroundColor:'#ffffff'}}>
            <Content>
                <Form>
                    <ListItem itemDivider>
                        <Text>免疫时间</Text>
                    </ListItem>
                    <ValidateInputDate label="从" data={immFilterStore} name="StartDate" placeholder="选择日期" onChange={(e)=>{this.onUpdateData({StartDate:e})}} />
                    <ValidateInputDate label="至" data={immFilterStore} name="EntDate" placeholder="选择日期" onChange={(e)=>{this.onUpdateData({EntDate:e})}} />
                    <ListItem itemDivider>
                        <Text>免疫状态</Text>
                    </ListItem>
                    <ValidateRadioInput data={immFilterStore} name="PlanState" options={options} onChanged={(e)=>this.onUpdateData({PlanState:e})}></ValidateRadioInput>
                    <ListItem itemDivider>
                    </ListItem>
                </Form>

            </Content>
            <FootBar buttons={buttons}></FootBar>
        </Container>);
    }
}