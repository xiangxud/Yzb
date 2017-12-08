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

export default class filter extends Component{
    constructor(props){
        super(props);
    }
    onUpdateData(obj){
        let {onUpdateData} = this.props;
        onUpdateData(obj);
    }
    onCancel()
    {
        let {onCancel} = this.props;
        if(onCancel)
        {
            onCancel();
        }
    }
    onApply()
    {
        let {source,onApply} = this.props;
        if(onApply)
        {
            onApply(source);
        }
    }
    render(){
        let {source,options} = this.props;
        let buttons=[{title:'取消',onPress:()=> this.onCancel()},{title:'查询',default:true,onPress:()=> this.onApply(source)}];

        return (<Container style={{flex:1,backgroundColor:'#ffffff'}}>
            <Content>
                <Form>
                    <ListItem itemDivider>
                        <Text>免疫时间</Text>
                    </ListItem>
                    <ValidateInputDate label="从" data={source} name="StartDate" placeholder="选择日期" onChange={(e)=>{this.onUpdateData({StartDate:e})}} />
                    <ValidateInputDate label="至" data={source} name="EntDate" placeholder="选择日期" onChange={(e)=>{this.onUpdateData({EntDate:e})}} />
                    <ListItem itemDivider>
                        <Text>免疫状态</Text>
                    </ListItem>
                    <ValidateRadioInput data={source} name="PlanState" options={options} onChanged={(e)=>this.onUpdateData({PlanState:e})}></ValidateRadioInput>
                </Form>
            </Content>
            <FootBar buttons={buttons}></FootBar>
        </Container>);
    }
}