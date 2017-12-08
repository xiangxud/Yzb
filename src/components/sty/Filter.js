import React, {Component} from 'react';
import
{
    TouchableOpacity,
    StyleSheet,
    View
} from 'react-native';
import { Form, ListItem,Left,Body,Right, Text,Icon} from 'native-base';
import {ValidateInput,ValidateInputDate,ValidateChooseItem,ReadOnlyInput} from '../../components/common/native-base-validate'
import {inject} from "mobx-react/native";

@inject('immFilterStore')
export default class filter extends Component{
    constructor(props){
        super(props);
    }
    onUpdateData(obj){
        let {immFilterStore} = this.props;
        debugger;
        immFilterStore.update(obj);
    }
    render(){
        let {immFilterStore} = this.props;
        debugger;
        return (<View style={{flex:1,backgroundColor:'#ffffff'}}>
            <Form>
                <ListItem itemDivider>
                    <Text>免疫时间</Text>
                </ListItem>
                <ValidateInputDate label="从" data={immFilterStore} name="StartDate" placeholder="选择日期" onChange={(e)=>{this.onUpdateData({StartDate:e})}} />
                <ValidateInputDate label="至" data={immFilterStore} name="EntDate" placeholder="选择日期" onChange={(e)=>{this.onUpdateData({EntDate:e})}} />
                <ListItem itemDivider>
                    <Text>免疫状态</Text>
                </ListItem>
            </Form>
        </View>);
    }
}